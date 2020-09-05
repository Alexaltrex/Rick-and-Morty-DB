import {GetActionsType} from "./store";
import {charactersAC} from "./characters-reducer";

const SET_CURRENT_ITEM = 'SIDEBAR/SET_CURRENT_ITEM';

let initialState = {
    currentItem: 0
}

export type initialStateType = typeof initialState;
type CharactersActionsType = GetActionsType<typeof sidebarAC>

const sidebarReducer = (state = initialState, action: CharactersActionsType):initialStateType => {
    switch (action.type) {
        case SET_CURRENT_ITEM: {
            return {...state, currentItem: action.currentItem}
        }
        default:
            return state;
    }
}

export const sidebarAC = {
    setCurrentSidebarMenuItem: (currentItem: number) => ({type: SET_CURRENT_ITEM, currentItem} as const)
}


export default sidebarReducer;