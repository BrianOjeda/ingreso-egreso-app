import * as fromAuth from './auth.actions';
import { User } from './user.model';


export interface AuthState{
    user:User;
}

const estadoInicial:AuthState={
    user:null
}

export function authReducers(state=estadoInicial,action:fromAuth.SetUserAction):AuthState{
    
    switch(action.type){

        case fromAuth.SET_USER:
            return {
                user:{
                    ... action.user
                }
            };
        default:
            return state;

    }

}


