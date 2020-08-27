import {
    CharacterType,
    EpisodesDataType,
    EpisodeType,
    SearchingEpisodesParamsType
} from "../Types/Types";
import {GetActionsType, StateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {charactersAPI, episodesAPI} from "../DAL/api";
import {charactersAC} from "./characters-reducer";

const initialState = {
    initialized: false, // нужен?
    episodes: [] as Array<EpisodeType>,
    totalEpisodesCount: 0, // нужен?
    totalPagesCount: 0,
    currentEpisode: {} as EpisodeType,
    next: null as string | null,
    prev: null as string | null,
    isLoading: false,
    charactersOfCurrentEpisode: null as null | Array<CharacterType>,
    showEpisodesFromSearch: false,
    searchingParams: {
        name: '', episode: ''
    },
    searchError: false
};

export type InitialStateType = typeof initialState;

const episodesReducer = (state = initialState, action: EpisodesActionsType): InitialStateType => {
    switch (action.type) {
        case 'EPISODES/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'EPISODES/SET_EPISODES': {
            return {
                ...state,
                episodes: action.episodesData.results,
                totalEpisodesCount: action.episodesData.info.count,
                totalPagesCount: action.episodesData.info.pages,
                next: action.episodesData.info.next,
                prev: action.episodesData.info.prev
            }
        }
        case 'EPISODES/SET_CURRENT_EPISODE': {
            return {...state, currentEpisode: action.currentEpisode}
        }
        case 'EPISODES/SET_CHARACTERS_OF_CURRENT_EPISODE': {
            return {...state, charactersOfCurrentEpisode: action.charactersOfCurrentEpisode}
        }
        case 'EPISODES/SET_SHOW_EPISODES_FROM_SEARCH': {
            return {...state, showEpisodesFromSearch: action.showEpisodesFromSearch}
        }
        case 'EPISODES/SET_SEARCHING_PARAMS': {
            return {
                ...state, searchingParams: action.searchingParams
            }
        }
        default:
            return state;
    }
};

type EpisodesActionsType = GetActionsType<typeof episodesAC>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, EpisodesActionsType>

export const episodesAC = {
    setInitialized: () => ({type: 'EPISODES/SET_INITIALIZED'} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'EPISODES/TOGGLE_LOADING', isLoading} as const),
    setEpisodes: (episodesData: EpisodesDataType) => ({type: 'EPISODES/SET_EPISODES', episodesData} as const),
    setCurrentEpisode: (currentEpisode: EpisodeType) => ({
        type: 'EPISODES/SET_CURRENT_EPISODE',
        currentEpisode
    } as const),
    setCharactersOfCurrentEpisode: (charactersOfCurrentEpisode: Array<CharacterType>) => ({
        type: 'EPISODES/SET_CHARACTERS_OF_CURRENT_EPISODE',
        charactersOfCurrentEpisode
    } as const),
    setShowEpisodesFromSearch: (showEpisodesFromSearch: boolean) => ({
        type: 'EPISODES/SET_SHOW_EPISODES_FROM_SEARCH',
        showEpisodesFromSearch
    } as const),
    setSearchingParams: (searchingParams: SearchingEpisodesParamsType) => ({
        type: 'EPISODES/SET_SEARCHING_PARAMS',
        searchingParams
    } as const),
    setSearchError: (searchError: boolean) => ({type: 'EPISODES/SET_SEARCH_ERROR', searchError} as const),
}


export const getEpisodes = (): ThunkType => async (dispatch, getState) => {
    dispatch(episodesAC.toggleLoading(true));
    // 1 - получение числа страниц totalPagesCount
    const resultWithTotalPageCount = await episodesAPI.getEpisodes();
    const totalPagesCount = resultWithTotalPageCount.info.pages;
    // 2 - получение ВСЕХ эпизодов
    let arrPages = [];
    for (let i = 1; i <= totalPagesCount; i++) {  //getState().episodes.totalPagesCount
        arrPages.push(i)
    }
    const arrayOfRequests = arrPages.map(pageNumber => episodesAPI.getEpisodes(pageNumber))
    let results = await Promise.all(arrayOfRequests);
    let data = {} as EpisodesDataType;
    data.info = results[0].info;
    let resultsArray = [] as Array<EpisodeType>
    for (let i = 0; i < totalPagesCount; i++) {
        resultsArray = [...resultsArray, ...results[i].results]
    }
    data.results = resultsArray
    //data.results = [...results[0].results, ...results[1].results, ...results[2].results]
    // 3 - запись ВСЕХ эпизодов в store
    dispatch(episodesAC.setEpisodes(data))
    dispatch(episodesAC.toggleLoading(false));
};

export const getCurrentEpisode = (id: number): ThunkType => async (dispatch, getState) => {
    dispatch(episodesAC.toggleLoading(true));
    let getCurrentEpisodeResponse = await episodesAPI.getCurrentEpisode(id);
    dispatch(episodesAC.setCurrentEpisode(getCurrentEpisodeResponse));
    // получение информации о персонажах, относящихся к текущему эпизоду:
    // в currentEpisode содержится только массив ссылок на персонажей
    // выполняется при монтировании компоненты EpisodeInfo
    const arrayOfRequests = getCurrentEpisodeResponse.characters.map(url => charactersAPI.getCharacterByUrl(url))
    let results = await Promise.all(arrayOfRequests);
    dispatch(episodesAC.setCharactersOfCurrentEpisode(results));
    dispatch(episodesAC.toggleLoading(false));
};

export const getEpisodesFromSearch = (searchingParams: SearchingEpisodesParamsType): ThunkType => async (dispatch) => {
    try {
        dispatch(episodesAC.toggleLoading(true));
        // 1 - получение числа страниц totalPagesCount
        console.log(searchingParams)
        const resultWithTotalPageCount = await episodesAPI.searchEpisodes(searchingParams);
        const totalPagesCount = resultWithTotalPageCount.info.pages;
        // 2 - получение ВСЕХ эпизодов
        let arrPages = [];
        for (let i = 1; i <= totalPagesCount; i++) {
            arrPages.push(i)
        }

        const arrayOfRequests = arrPages.map(pageNumber => episodesAPI.searchEpisodes(searchingParams, pageNumber))
        let results = await Promise.all(arrayOfRequests);
        let data = {} as EpisodesDataType;
        data.info = results[0].info;
        let resultsArray = [] as Array<EpisodeType>
        for (let i = 0; i < totalPagesCount; i++) {
            resultsArray = [...resultsArray, ...results[i].results]
        }
        data.results = resultsArray
        // 3 - запись ВСЕХ эпизодов в store
        dispatch(episodesAC.setSearchError(false))
        dispatch(episodesAC.setEpisodes(data));
    } catch (e) {
        dispatch(episodesAC.setSearchError(true));
    } finally {
        dispatch(episodesAC.toggleLoading(false));
    }
}

export default episodesReducer;