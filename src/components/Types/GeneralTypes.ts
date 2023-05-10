export interface Authorization {
  isAuth: boolean;
  firstname?: string;
  lastname?: string;
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
