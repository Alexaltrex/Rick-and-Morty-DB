import {
    CharacterType,
    EpisodesDataType,
    EpisodeType,
    SearchingEpisodesParamsType
} from "../Types/Types";
import {GetActionsType, StateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {charactersAPI, episodesAPI} from "../DAL/api";
import {appAC, AppActionsType} from "./app-reducer";

const initialState = {
    episodes: [] as Array<EpisodeType>,
    totalEpisodesCount: 0, // нужен?
    totalPagesCount: 0,
    currentEpisode: {} as EpisodeType,
    next: null as string | null,
    prev: null as string | null,
    charactersOfCurrentEpisode: null as null | Array<CharacterType>,
    showEpisodesFrom: 'all' as 'all' | 'search' | 'character',
    searchingParams: {
        name: '', episode: ''
    },
    aroundId: {prevId: null as null | number, nextId: null as null | number},
};

export type InitialStateType = typeof initialState;

const episodesReducer = (state = initialState, action: EpisodesActionsType): InitialStateType => {
    switch (action.type) {
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
        case 'EPISODES/SET_SHOW_EPISODES_FROM': {
            return {...state, showEpisodesFrom: action.showEpisodesFrom}
        }
        case 'EPISODES/SET_SEARCHING_PARAMS': {
            return {
                ...state, searchingParams: action.searchingParams
            }
        }
        case 'EPISODES/SET_AROUND_ID': {
            return {...state, aroundId: {prevId: action.prevId, nextId: action.nextId}}
        }
        default:
            return state;
    }
};

type EpisodesActionsType = GetActionsType<typeof episodesAC>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, EpisodesActionsType | AppActionsType>

export const episodesAC = {
    setEpisodes: (episodesData: EpisodesDataType) => ({type: 'EPISODES/SET_EPISODES', episodesData} as const),
    setCurrentEpisode: (currentEpisode: EpisodeType) => ({
        type: 'EPISODES/SET_CURRENT_EPISODE',
        currentEpisode
    } as const),
    setCharactersOfCurrentEpisode: (charactersOfCurrentEpisode: Array<CharacterType>) => ({
        type: 'EPISODES/SET_CHARACTERS_OF_CURRENT_EPISODE',
        charactersOfCurrentEpisode
    } as const),
    setShowEpisodesFrom: (showEpisodesFrom: 'all' | 'search' | 'character') => ({
        type: 'EPISODES/SET_SHOW_EPISODES_FROM', showEpisodesFrom
    } as const),
    setSearchingParams: (searchingParams: SearchingEpisodesParamsType) => ({
        type: 'EPISODES/SET_SEARCHING_PARAMS',
        searchingParams
    } as const),
    setAroundId: (prevId: number | null, nextId: number | null) => ({
        type: 'EPISODES/SET_AROUND_ID',
        prevId,
        nextId
    } as const),
}


export const getEpisodes = (): ThunkType => async (dispatch, getState) => {
    dispatch(appAC.toggleLoading(true));
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
    dispatch(appAC.toggleLoading(false));
};

export const getCurrentEpisode = (id: number): ThunkType => async (dispatch, getState) => {
    dispatch(appAC.toggleLoading(true));
    let getCurrentEpisodeResponse = await episodesAPI.getCurrentEpisode(id);
    dispatch(episodesAC.setCurrentEpisode(getCurrentEpisodeResponse));
    // получение информации о персонажах, относящихся к текущему эпизоду:
    // в currentEpisode содержится только массив ссылок на персонажей
    // выполняется при монтировании компоненты EpisodeInfo
    const arrayOfRequests = getCurrentEpisodeResponse.characters.map(url => charactersAPI.getCharacterByUrl(url))
    let results = await Promise.all(arrayOfRequests);
    dispatch(episodesAC.setCharactersOfCurrentEpisode(results));
    dispatch(appAC.toggleLoading(false));
};

export const getEpisodesFromSearch = (searchingParams: SearchingEpisodesParamsType): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
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
        dispatch(episodesAC.setEpisodes(data));
    } catch (e) {
        const episodesData = {} as EpisodesDataType;
        episodesData.results = []
        episodesData.info = {
            count: 0,
            pages: 1,
            prev: null,
            next: null
        }
        dispatch(episodesAC.setEpisodes(episodesData));




    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const getAroundId = (targetId: number, change: null | 'prev' | 'next'): ThunkType => async (dispatch, getState) => {
    try {
        /////////// ОБЩЕЕ ////////////////////////////////////////////////////////////////////////
        dispatch(appAC.toggleLoading(true));
        let prevId;
        let nextId;
        const episodes = getState().episodes.episodes;
        // позиция id, на который переходим, целевого, в массиве episodes (т.е. на текущей странице)
        const positionTargetIdInEpisodes = getState().episodes.episodes.findIndex(el => el.id === targetId);// -1 если нет
        /////////////////////////////////////////////////////////////////////////////////////////
        // ОПРЕДЕЛЕНИЕ prevId ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (positionTargetIdInEpisodes > 0) {// если целевой ид не первый
            prevId = episodes[positionTargetIdInEpisodes - 1].id
        } else {
            prevId = null
        }
        // ОПРЕДЕЛЕНИЕ nextId //////////////////////////////////////////////////////////////////////////////////////////////
        if (positionTargetIdInEpisodes < episodes.length - 1) { //целевой ид не последний
            nextId = episodes[positionTargetIdInEpisodes + 1].id;
        } else {
            nextId = null;
        }
        dispatch(episodesAC.setAroundId(prevId, nextId));
    } catch
        (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export default episodesReducer;