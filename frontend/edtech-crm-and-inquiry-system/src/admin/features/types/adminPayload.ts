export type LoginPayload = {
  email: string;
  password: string;
};

export type Admin = {
  id: string;
  email: string;
  name: string;
};

export type AuthState = {
  admin: Admin | null;
  isAuthenticated: boolean;
};