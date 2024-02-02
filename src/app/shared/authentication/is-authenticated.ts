import { AuthState } from '../../constants/auth.constants';
import store from '../../store';

const authState: AuthState = store.getState().auth;
export const isAuthenticated = authState.success;
