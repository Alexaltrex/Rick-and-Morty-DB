import {GetActionsType, StateType} from "./store";

const initialState = {
    isLoading: false,
    lanError: false,
};

export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'APP/SET_LAN_ERROR': {
            return {...state, lanError: action.lanError}
        }
        default:
            return state;
    }
};

export const appAC = {
    toggleLoading: (isLoading: boolean) => ({type: 'APP/TOGGLE_LOADING', isLoading} as const),
    setLanError: (lanError: boolean) => ({type: 'APP/SET_LAN_ERROR', lanError} as const),
};



export default appReducer;