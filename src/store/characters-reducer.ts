import {CharactersDataType, CharacterType, EpisodeType, SearchingCharactersParamsType} from "../Types/Types";
import {GetActionsType, StateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {charactersAPI, episodesAPI} from "../DAL/api";

const initialState = {
    initialized: false, // нужен?
    characters: [] as Array<CharacterType>, // персонажи на одной текущей странице (<=20)
    totalCharactersCount: 0, // нужен?
    totalPagesCount: 0,
    currentPage: 1,
    currentCharacter: null as CharacterType | null | undefined,
    currentCharacterId: null as null | number,
    next: null as string | null,
    prev: null as string | null,
    isLoading: false,
    showCharactersFromSearch: false,
    searchingParams: {
        name: '', gender: '', status: '', species: '', type: ''
    },
    searchError: false,
    episodesOfCurrentCharacter: null as null | Array<EpisodeType>,
    gettingIdIsStart: false, // запрос на получение следующего/предыдущего id начат
    idChange: undefined as undefined | 'next' | 'prev'
};

export type InitialStateType = typeof initialState;

const charactersReducer = (state = initialState, action: CharactersActionsType): InitialStateType => {
    switch (action.type) {
        case 'CHARACTERS/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'CHARACTERS/SET_CHARACTERS': {
            return {
                ...state,
                characters: action.charactersData.results,
                totalCharactersCount: action.charactersData.info.count,
                totalPagesCount: action.charactersData.info.pages,
                next: action.charactersData.info.next,
                prev: action.charactersData.info.prev
            }
        }
        case 'CHARACTERS/SET_CURRENT_CHARACTER': {
            return {...state, currentCharacter: action.currentCharacter}
        }
        case 'CHARACTERS/SET_CURRENT_CHARACTER_ID': {
            return {...state, currentCharacterId: action.currentCharacterId}
        }
        case 'CHARACTERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'CHARACTERS/SET_SHOW_CHARACTERS_FROM_SEARCH': {
            return {...state, showCharactersFromSearch: action.showCharactersFromSearch}
        }
        case 'CHARACTERS/SET_SEARCHING_PARAMS': {
            return {
                ...state, searchingParams: action.searchingParams
            }
        }
        case 'CHARACTERS/SET_SEARCH_ERROR': {
            return {
                ...state, searchError: action.searchError
            }
        }
        case 'CHARACTERS/SET_EPISODES_OF_CURRENT_CHARACTER': {
            return {
                ...state, episodesOfCurrentCharacter: action.episodesOfCurrentCharacter
            }
        }
        case 'CHARACTERS/SET_GETTING_ID_START': {
            return {
                ...state, gettingIdIsStart: action.gettingIdIsStart, idChange: action.idChange
            }
        }
        default:
            return state;
    }
};

export const charactersAC = {
    setInitialized: () => ({type: 'SET_INITIALIZED'} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'CHARACTERS/TOGGLE_LOADING', isLoading} as const),
    setCharacters: (charactersData: CharactersDataType) => ({
        type: 'CHARACTERS/SET_CHARACTERS',
        charactersData
    } as const),
    setCurrentCharacter: (currentCharacter: CharacterType) => ({
        type: 'CHARACTERS/SET_CURRENT_CHARACTER',
        currentCharacter
    } as const),
    setCurrentCharacterId: (currentCharacterId: number) => ({
        type: 'CHARACTERS/SET_CURRENT_CHARACTER_ID',
        currentCharacterId
    } as const),
    setCurrentPage: (currentPage: number) => ({type: 'CHARACTERS/SET_CURRENT_PAGE', currentPage} as const),
    setShowCharactersFromSearch: (showCharactersFromSearch: boolean) => ({
        type: 'CHARACTERS/SET_SHOW_CHARACTERS_FROM_SEARCH',
        showCharactersFromSearch
    } as const),
    setSearchingParams: (searchingParams: SearchingCharactersParamsType) => ({
        type: 'CHARACTERS/SET_SEARCHING_PARAMS',
        searchingParams
    } as const),
    setSearchError: (searchError: boolean) => ({type: 'CHARACTERS/SET_SEARCH_ERROR', searchError} as const),
    setEpisodesOfCurrentCharacter: (episodesOfCurrentCharacter: Array<EpisodeType>) => ({
        type: 'CHARACTERS/SET_EPISODES_OF_CURRENT_CHARACTER',
        episodesOfCurrentCharacter
    } as const),
    setGettingIdIsStart: (gettingIdIsStart: boolean, idChange?: 'next' | 'prev') => ({
        type: 'CHARACTERS/SET_GETTING_ID_START', gettingIdIsStart, idChange
    } as const)
};

type CharactersActionsType = GetActionsType<typeof charactersAC>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, CharactersActionsType>

export const getCharacters = (currentPage: number): ThunkType => async (dispatch) => {
    dispatch(charactersAC.toggleLoading(true));
    let data = await charactersAPI.getCharacters(currentPage);
    dispatch(charactersAC.setCharacters(data));
    dispatch(charactersAC.toggleLoading(false));
};

export const getCurrentCharacter = (id: number): ThunkType => async (dispatch) => {
    dispatch(charactersAC.toggleLoading(true));
    let getCurrentCharacterResponse = await charactersAPI.getCurrentCharacter(id);
    dispatch(charactersAC.setCurrentCharacter(getCurrentCharacterResponse));
    // получение информации о эпизодах, относящихся к текущему характеру:
    // в currentCharacter содержится только массив ссылок на эпизоды
    const arrayOfRequests = getCurrentCharacterResponse.episode.map(episodeUrl => episodesAPI.getEpisodesByUrl(episodeUrl))
    let results = await Promise.all(arrayOfRequests);
    dispatch(charactersAC.setEpisodesOfCurrentCharacter(results));
    dispatch(charactersAC.toggleLoading(false));
};

export const getCharactersFromSearch = (searchingParams: SearchingCharactersParamsType, currentPage: number): ThunkType => async (dispatch) => {
    try {
        dispatch(charactersAC.toggleLoading(true));
        let data = await charactersAPI.searchCharacters(searchingParams, currentPage);
        dispatch(charactersAC.setSearchError(false))
        dispatch(charactersAC.setCharacters(data));
    } catch (e) {
        dispatch(charactersAC.setSearchError(true));
    } finally {
        dispatch(charactersAC.toggleLoading(false));
    }
};

export const getNextOrPrevId = (currentCharacterId: number, idChange: undefined | 'next' | 'prev'): ThunkType => async (dispatch, getState) => {
    //dispatch(charactersAC.toggleLoading(true));
    // если характеры НЕ из поиска
    if (!getState().characters.showCharactersFromSearch) {
        if (idChange === 'prev') {
            dispatch(charactersAC.setCurrentCharacterId(currentCharacterId - 1))
        }
        if (idChange === 'next') {
            dispatch(charactersAC.setCurrentCharacterId(currentCharacterId + 1))
        }
    }
    dispatch(charactersAC.setGettingIdIsStart(false))
}

export default charactersReducer;