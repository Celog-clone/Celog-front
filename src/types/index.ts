export interface User {
  email: string;
  password: string;
}

export interface NewUser {
  nickname: string;
  email: string;
  password: string;
}

export interface TextField {
  label: string;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  helperText: string;
}
