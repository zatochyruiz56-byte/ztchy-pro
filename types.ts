
export interface UserProfile {
  email: string;
  name: string;
  role: string;
  lastLogin: string;
}

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
