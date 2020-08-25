const SET_CURRENT_ITEM = 'SIDEBAR/SET_CURRENT_ITEM';

let initialState = {
    currentItem: 0
}

export type initialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case SET_CURRENT_ITEM: {
            return {...state, currentItem: action.currentItem}
        }
        default:
            return state;
    }
}

type setCurrentItemType = {
    type: typeof SET_CURRENT_ITEM
    currentItem: number
}

export const setCurrentItem = (currentItem: number): setCurrentItemType => ({type: SET_CURRENT_ITEM, currentItem});

export default sidebarReducer;