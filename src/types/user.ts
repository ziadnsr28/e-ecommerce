export interface ChangePasswordRequest {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface ChangePasswordApiResponse {
  message: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
  statusMsg?: string;
  errors?:
    | {
        msg?: string;
        param?: string;
        value?: string;
        location?: string;
      }
    | string;
}
