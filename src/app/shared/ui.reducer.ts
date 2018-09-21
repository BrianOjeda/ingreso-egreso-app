
import * as fromUIAcciones from './ui.accions';

export interface State{
    isLoading:boolean;
}

const initState:State={
    isLoading:false
};

export function  uiReducer(state=initState,action:fromUIAcciones.acciones):State{

    switch(action.type){
            case fromUIAcciones.ACTIVAR_LOADING:
                return {
                    isLoading:true
                }
            case fromUIAcciones.DESACTIVAR_LOADING:
                return {
                    isLoading:false
                }
        default:
            return state;
    }
}