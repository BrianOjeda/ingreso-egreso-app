import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    ui:fromUi.State;
    auth:fromAuth.AuthState;
}

export const AppReducers:ActionReducerMap<AppState>={
    ui:fromUi.uiReducer,
    auth:fromAuth.authReducers
};    