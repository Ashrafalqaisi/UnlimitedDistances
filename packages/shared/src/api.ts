// Typed calls to the Nest API (apps/api), shared by the web and mobile apps.
import type { Locale } from './locale';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  /** Email address or username. */
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  username: string;
  phone?: string;
  password: string;
  locale?: Locale;
}

export type Role = 'RUNNER' | 'ADMIN' | 'SUPER_ADMIN';

/** The signed-in user, as returned by GET /auth/me. */
export interface Me {
  id: string;
  fullName: string;
  email: string;
  username: string;
  phone: string | null;
  locale: Locale;
  role: Role;
  emailVerified: boolean;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    /** Machine-readable reason, for example "EMAIL_NOT_VERIFIED". */
    readonly code?: string,
    /** Any extra fields the API sent with the error. */
    readonly details: Record<string, unknown> = {},
  ) {
    super(message);
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  body?: unknown;
  accessToken?: string;
}

/** Calls `${baseUrl}/api/v1${path}` and throws ApiError on any non-2xx response. */
export async function request<T>(
  baseUrl: string,
  method: HttpMethod,
  path: string,
  { body, accessToken }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const response = await fetch(`${baseUrl}/api/v1${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  // 204 and other empty bodies resolve to null
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Nest validation errors return message as an array
    const message = Array.isArray(data?.message) ? data.message.join(', ') : data?.message;
    throw new ApiError(response.status, message ?? response.statusText, data?.code, data ?? {});
  }
  return data as T;
}

export function login(baseUrl: string, credentials: LoginRequest) {
  return request<AuthTokens>(baseUrl, 'POST', '/auth/login', { body: credentials });
}

export function register(baseUrl: string, account: RegisterRequest) {
  return request<AuthTokens>(baseUrl, 'POST', '/auth/register', { body: account });
}

export function verifyEmail(baseUrl: string, token: string) {
  return request<null>(baseUrl, 'POST', '/auth/verify-email', { body: { token } });
}

export function resendVerification(baseUrl: string, email: string) {
  return request<null>(baseUrl, 'POST', '/auth/resend-verification', { body: { email } });
}

/** Rotates the refresh token. The old one stops working; reusing it signs the user out everywhere. */
export function refresh(baseUrl: string, refreshToken: string) {
  return request<AuthTokens>(baseUrl, 'POST', '/auth/refresh', { body: { refreshToken } });
}

/** Revokes the refresh token. Always succeeds, even for unknown tokens. */
export function logout(baseUrl: string, refreshToken: string) {
  return request<null>(baseUrl, 'POST', '/auth/logout', { body: { refreshToken } });
}

export function getMe(baseUrl: string, accessToken: string) {
  return request<Me>(baseUrl, 'GET', '/auth/me', { accessToken });
}

export interface AuthedClientOptions {
  baseUrl: string;
  /** The current access token, or null when signed out. */
  getAccessToken: () => string | null;
  /**
   * Gets a new access token (typically by calling `refresh` and storing the new pair).
   * Returns null, or throws, when the session can't be renewed.
   */
  refreshSession: () => Promise<string | null>;
  /** Called once when a refresh fails, so the app can clear its session. */
  onSignedOut: () => void;
}

export interface AuthedClient {
  request<T>(method: HttpMethod, path: string, body?: unknown): Promise<T>;
}

/**
 * A client for endpoints that need a signed-in user.
 * After a 401 it refreshes the session and retries once. Concurrent calls share one refresh,
 * so a rotated refresh token is never sent twice (which the API would treat as reuse).
 */
export function createAuthedClient({
  baseUrl,
  getAccessToken,
  refreshSession,
  onSignedOut,
}: AuthedClientOptions): AuthedClient {
  let pendingRefresh: Promise<string | null> | null = null;

  function refreshOnce(): Promise<string | null> {
    pendingRefresh ??= refreshSession()
      .catch(() => null)
      .then((token) => {
        if (!token) onSignedOut();
        return token;
      })
      .finally(() => {
        pendingRefresh = null;
      });
    return pendingRefresh;
  }

  return {
    async request<T>(method: HttpMethod, path: string, body?: unknown): Promise<T> {
      let accessToken = getAccessToken();
      // No access token in memory (e.g. app just launched): try to renew before the first call
      if (!accessToken) accessToken = await refreshOnce();
      if (!accessToken) throw new ApiError(401, 'Not signed in');

      try {
        return await request<T>(baseUrl, method, path, { body, accessToken });
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 401) throw error;
        const renewed = await refreshOnce();
        if (!renewed) throw error;
        return request<T>(baseUrl, method, path, { body, accessToken: renewed });
      }
    },
  };
}
