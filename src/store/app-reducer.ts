import {GetActionsType} from "./store";

const initialState = {
    open: true, // бокавая панель открыта
    isLoading: false, // загрузка происходит?
    lanError: false, // ошибка сети
};

export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>

const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_OPEN': {
            return {...state, open: action.open}
        }
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
    setOpen: (open: boolean) => ({type: 'APP/SET_OPEN', open} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'APP/TOGGLE_LOADING', isLoading} as const),
    setLanError: (lanError: boolean) => ({type: 'APP/SET_LAN_ERROR', lanError} as const),
};

export default appReducer;