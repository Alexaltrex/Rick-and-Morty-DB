import {applyMiddleware, combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import thunkMiddleware from "redux-thunk";
import charactersReducer from "./characters-reducer";
import episodesReducer from "./episodes-reducer";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
import locationsReducer from "./locations-reducer";

const rootReducer = combineReducers({
    form: formReducer,
    sidebar: sidebarReducer,
    characters: charactersReducer,
    episodes: episodesReducer,
    app: appReducer,
    locations: locationsReducer
});

export type StateType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type GetActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

// @ts-ignore
window.store = store;

export default store;