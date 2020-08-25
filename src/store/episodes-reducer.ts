import {CharacterType, EpisodesDataType, EpisodeType, InfoType} from "../Types/Types";
import {GetActionsType, StateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {charactersAPI, episodesAPI} from "../DAL/api";

const initialState = {
    initialized: false, // нужен?
    episodes: [] as Array<EpisodeType>,
    totalEpisodesCount: 0, // нужен?
    totalPagesCount: 0,
    currentPage: 1,
    currentEpisode: {} as EpisodeType,
    next: null as string | null,
    prev: null as string | null,
    isLoading: false,
    charactersOfCurrentEpisode: null as null | Array<CharacterType>
};

export type InitialStateType = typeof initialState;

const episodesReducer = (state = initialState, action: EpisodesActionsType): InitialStateType => {
    switch (action.type) {
        case 'TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'SET_EPISODES': {
            return {
                ...state,
                episodes: action.episodesData.results,
                totalEpisodesCount: action.episodesData.info.count,
                totalPagesCount: action.episodesData.info.pages,
                next: action.episodesData.info.next,
                prev: action.episodesData.info.prev
            }
        }
        case 'SET_CURRENT_EPISODE': {
            return {...state, currentEpisode: action.currentEpisode}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_CHARACTERS_OF_CURRENT_EPISODE': {
            return {...state, charactersOfCurrentEpisode: action.charactersOfCurrentEpisode}
        }
        default:
            return state;
    }
};

type EpisodesActionsType = GetActionsType<typeof episodesAC>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, EpisodesActionsType>

export const episodesAC = {
    setInitialized: () => ({type: 'SET_INITIALIZED'} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'TOGGLE_LOADING', isLoading} as const),
    setEpisodes: (episodesData: EpisodesDataType) => ({type: 'SET_EPISODES', episodesData} as const),
    setCurrentEpisode: (currentEpisode: EpisodeType) => ({type: 'SET_CURRENT_EPISODE', currentEpisode} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setCharactersOfCurrentEpisode: (charactersOfCurrentEpisode: Array<CharacterType>) => ({
        type: 'SET_CHARACTERS_OF_CURRENT_EPISODE',
        charactersOfCurrentEpisode
    } as const)
}


export const getEpisodes = (): ThunkType => async (dispatch, getState) => {
    dispatch(episodesAC.toggleLoading(true));
    // 1 - получение числа страниц totalPagesCount
    const resultWithTotalPageCount = await episodesAPI.getEpisodes();
    const totalPagesCount = resultWithTotalPageCount.info.pages;
    // 2 - получение ВСЕХ эпизодов
    let arrPages = [];
    for (let i = 1; i <= totalPagesCount ; i++){  //getState().episodes.totalPagesCount
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
    // 3 - запись всех эпизодов в store
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

export default episodesReducer;