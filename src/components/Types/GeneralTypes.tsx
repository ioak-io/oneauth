export interface Authorization {
  isAuth: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  tenant?: string;
}

export interface Profile {
  theme: string;
  tenant: string;
}

export interface Message {
  name: string;
  signal: boolean;
  data?: any;
}
