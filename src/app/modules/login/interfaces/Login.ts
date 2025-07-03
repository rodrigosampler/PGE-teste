export interface Login{
  email: string;
  senha: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface User{
  email: string;
  role: string;
  id: number;
}
