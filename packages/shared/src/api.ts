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

async function post<T>(baseUrl: string, path: string, body: unknown): Promise<T> {
  const response = await fetch(`${baseUrl}/api/v1${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Nest validation errors return message as an array
    const message = Array.isArray(data?.message) ? data.message.join(', ') : data?.message;
    throw new ApiError(response.status, message ?? response.statusText, data?.code, data ?? {});
  }
  return data as T;
}

export function login(baseUrl: string, credentials: LoginRequest) {
  return post<AuthTokens>(baseUrl, '/auth/login', credentials);
}

export function register(baseUrl: string, account: RegisterRequest) {
  return post<AuthTokens>(baseUrl, '/auth/register', account);
}

export function verifyEmail(baseUrl: string, token: string) {
  return post<null>(baseUrl, '/auth/verify-email', { token });
}

export function resendVerification(baseUrl: string, email: string) {
  return post<null>(baseUrl, '/auth/resend-verification', { email });
}
