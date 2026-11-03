// Typed calls to the Nest API (apps/api), shared by the web and mobile apps.

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
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
    throw new ApiError(response.status, message ?? response.statusText);
  }
  return data as T;
}

export function login(baseUrl: string, credentials: LoginRequest) {
  return post<AuthTokens>(baseUrl, '/auth/login', credentials);
}
