export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  token: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiration: string;
  lastLogIn?: string;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}
