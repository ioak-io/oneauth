export interface Authorization {
  isAuth: boolean;
  given_name?: string;
  family_name?: string;
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
