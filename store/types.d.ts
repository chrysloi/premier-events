import {store} from '.';

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  error: boolean;
}

interface validateTokenResponse {
  authenticated: boolean;
  route: string;
}

interface TokenState {
  loading: boolean;
  error: string;
  route: string;
}

interface tokenData {
  id: number;
  fname: string;
  lname: string;
  focal: string;
  level: string;
  username: string;
  isActive: boolean;
  exp: number;
  iat: number;
}

interface ScanState {
  loading: boolean;
  error: boolean;
  data: ScanData[];
}

interface ScanData {
  status: string;
  att_id: number;
  rid: number;
  fname: string;
  lname: string;
  email: string;
  city: string;
  phone: string;
  message?: string;
}

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
