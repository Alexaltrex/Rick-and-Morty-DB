import {CharactersDataType, CharacterType, EpisodeType, SearchingCharactersParamsType} from "../Types/Types";
import {GetActionsType, StateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {charactersAPI, episodesAPI} from "../DAL/api";
import {appAC, AppActionsType} from "./app-reducer";

const initialState = {
    characters: [] as Array<CharacterType>, // персонажи на одной текущей странице (<=20)
    totalCharactersCount: 0,
    totalPagesCount: 0,
    currentPage: 1,
    currentCharacter: null as CharacterType | null | undefined,
    next: null as string | null,
    prev: null as string | null,
    showCharactersFrom: 'all' as 'all' | 'search' | 'episode' | 'location',
    searchingParams: {
        name: '', gender: '', status: '', species: '', type: ''
    },
    episodesOfCurrentCharacter: null as null | Array<EpisodeType>,
    aroundId: {prevId: null as null | number, nextId: null as null | number},
};

export type InitialStateType = typeof initialState;

const charactersReducer = (state = initialState, action: CharactersActionsType): InitialStateType => {
    switch (action.type) {
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
        case 'CHARACTERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'CHARACTERS/SET_SEARCHING_PARAMS': {
            return {...state, searchingParams: action.searchingParams}
        }
        case 'CHARACTERS/SET_EPISODES_OF_CURRENT_CHARACTER': {
            return {...state, episodesOfCurrentCharacter: action.episodesOfCurrentCharacter}
        }
        case 'CHARACTERS/SET_AROUND_ID': {
            return {...state, aroundId: {prevId: action.prevId, nextId: action.nextId}}
        }
        case 'CHARACTERS/SET_SHOW_CHARACTERS_FROM': {
            return {...state, showCharactersFrom: action.showCharactersFrom}
        }
        default:
            return state;
    }
};

export const charactersAC = {
    setCharacters: (charactersData: CharactersDataType) => ({
        type: 'CHARACTERS/SET_CHARACTERS',
        charactersData
    } as const),
    setCurrentCharacter: (currentCharacter: CharacterType | null) => ({
        type: 'CHARACTERS/SET_CURRENT_CHARACTER',
        currentCharacter
    } as const),
    setCurrentPage: (currentPage: number) => ({type: 'CHARACTERS/SET_CURRENT_PAGE', currentPage} as const),
    setSearchingParams: (searchingParams: SearchingCharactersParamsType) => ({
        type: 'CHARACTERS/SET_SEARCHING_PARAMS',
        searchingParams
    } as const),
    setEpisodesOfCurrentCharacter: (episodesOfCurrentCharacter: Array<EpisodeType>) => ({
        type: 'CHARACTERS/SET_EPISODES_OF_CURRENT_CHARACTER',
        episodesOfCurrentCharacter
    } as const),
    setAroundId: (prevId: number | null, nextId: number | null) => ({
        type: 'CHARACTERS/SET_AROUND_ID',
        prevId,
        nextId
    } as const),
    setShowCharactersFrom: (showCharactersFrom: 'all' | 'search' | 'episode' | 'location') => ({
        type: 'CHARACTERS/SET_SHOW_CHARACTERS_FROM', showCharactersFrom
    } as const)
};

type CharactersActionsType = GetActionsType<typeof charactersAC>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, CharactersActionsType | AppActionsType>

export const getCharacters = (currentPage: number): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await charactersAPI.getCharacters(currentPage);
        dispatch(charactersAC.setCharacters(data));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const getCurrentCharacter = (id: number): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let getCurrentCharacterResponse = await charactersAPI.getCurrentCharacter(id);
        dispatch(charactersAC.setCurrentCharacter(getCurrentCharacterResponse));
        // получение информации о эпизодах, относящихся к текущему характеру:
        // в currentCharacter содержится только массив ссылок на эпизоды
        const arrayOfRequests = getCurrentCharacterResponse.episode.map(episodeUrl => episodesAPI.getEpisodesByUrl(episodeUrl))
        let results = await Promise.all(arrayOfRequests);
        dispatch(charactersAC.setEpisodesOfCurrentCharacter(results));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const getCharactersFromSearch = (searchingParams: SearchingCharactersParamsType, currentPage: number): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await charactersAPI.searchCharacters(searchingParams, currentPage);
        dispatch(charactersAC.setCharacters(data));
    } catch (e) {
        const charactersData = {} as CharactersDataType;
        charactersData.results = []
        charactersData.info = {
            count: 0,
            pages: 1,
            prev: null,
            next: null
        }
        dispatch(charactersAC.setCharacters(charactersData));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const getAroundId = (targetId: number, change: null | 'prev' | 'next'): ThunkType => async (dispatch, getState) => {
    try {
        /////////// ОБЩЕЕ ////////////////////////////////////////////////////////////////////////
        dispatch(appAC.toggleLoading(true));
        let prevId = null, nextId = null;
        const currentPage = getState().characters.currentPage;
        const totalCharactersCount = getState().characters.totalCharactersCount;
        const characters = getState().characters.characters;
        const totalPagesCount = getState().characters.totalPagesCount;
        const searchingParams = getState().characters.searchingParams;
        const showCharactersFrom = getState().characters.showCharactersFrom;
        // позиция id, на который переходим, целевого, в массиве characters (т.е. на текущей странице)
        // от 0 до getState().characters.characters.length - 1
        const positionTargetIdInCharacters = getState().characters.characters.findIndex(el => el.id === targetId);// -1 если нет
        /////////////////////////////////////////////////////////////////////////////////////////
        // ЕСЛИ ХАРАКТЕРЫ ИЗ ОСНОВНОГО НАБОРА //////////////////////////////////////////////////////////
        if (showCharactersFrom === 'all') {
            //console.log('ЕСЛИ ХАРАКТЕРЫ ИЗ ОСНОВНОГО НАБОРА')
            if (targetId > 1) {
                prevId = targetId - 1;
            } else {
                prevId = null;
            }
            if (targetId < totalCharactersCount) {
                nextId = targetId + 1;
            } else {
                nextId = null;
            }
            // если целевой ид не на текущей странице и предыдущая страница существует
            if (positionTargetIdInCharacters < 0 && currentPage > 1) {
                let prevCharactersData = await charactersAPI.searchCharacters(searchingParams, currentPage - 1); // запрашиваем предыдущую страницу
                // получаем и загружаем предыдущую страницу в стор
                if (change === 'prev') {
                    dispatch(charactersAC.setCharacters(prevCharactersData));
                    dispatch(charactersAC.setCurrentPage(currentPage - 1));
                }
            }
            // целевой ид не на текущий странице, следующая страница существует и ее длина > 1
            if (positionTargetIdInCharacters < 0 && currentPage < totalPagesCount) {
                let nextCharactersData = await charactersAPI.searchCharacters(searchingParams, currentPage + 1); // запрашиваем следующую страницу
                if (nextCharactersData.results.length > 1) {
                    // получаем и загружаем следующую страницу в стор
                    if (change === 'next') {
                        dispatch(charactersAC.setCharacters(nextCharactersData));
                        dispatch(charactersAC.setCurrentPage(currentPage + 1));
                    }
                }
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // ЕСЛИ ХАРАКТЕРЫ ИЗ ПОИСКА /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (showCharactersFrom === 'search') {
            // ОПРЕДЕЛЕНИЕ prevId ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            prevId = null
            // если целевой ид на текущей станице и не первый - prevId = characters[positionTargetIdInCharacters - 1]
            if (positionTargetIdInCharacters > 0) {
                prevId = characters[positionTargetIdInCharacters - 1].id
            }
            // если целевой ид на текущей станице и первый и предыдущая страница существует - prevId - последний на предыдущей странице
            if (positionTargetIdInCharacters === 0 && currentPage > 1) {
                let prevCharactersData = await charactersAPI.searchCharacters(searchingParams, currentPage - 1); // запрашиваем предыдущую страницу
                prevId = prevCharactersData.results[19].id;
            }
            // если целевой ид не на текущей странице, предыдущая страница существует - prevId - предпоследний на предыдущей странице
            if (positionTargetIdInCharacters < 0 && currentPage > 1) {
                let prevCharactersData = await charactersAPI.searchCharacters(searchingParams, currentPage - 1); // запрашиваем предыдущую страницу
                prevId = prevCharactersData.results[18].id;
                // получаем и загружаем предыдущую страницу в стор
                if (change === 'prev') {
                    dispatch(charactersAC.setCharacters(prevCharactersData));
                    dispatch(charactersAC.setCurrentPage(currentPage - 1));
                }
            }

            // ОПРЕДЕЛЕНИЕ nextId //////////////////////////////////////////////////////////////////////////////////////////////
            nextId = null;
            // целевой ид на текущий странице, но не последний - nextId = characters[positionCurrentIdInCharacters + 1]
            if (positionTargetIdInCharacters > -1 && positionTargetIdInCharacters < characters.length - 1) { //целевой ид на текущий странице, но не последний
                nextId = characters[positionTargetIdInCharacters + 1].id;
            }
            // целевой ид на текущий странице и последний, следующая страница существует - nextId - первый на следующей странице
            if (positionTargetIdInCharacters === characters.length - 1 && currentPage < totalPagesCount) {
                let nextCharactersData = await charactersAPI.searchCharacters(searchingParams, currentPage + 1); // запрашиваем следующую страницу
                nextId = nextCharactersData.results[0].id; // первый на следующей странице
            }
            // целевой ид не на текущий странице, следующая страница существует и ее длина > 1 - nextId - второй на следующей странице
            if (positionTargetIdInCharacters < 0 && currentPage < totalPagesCount) {
                let nextCharactersData = await charactersAPI.searchCharacters(searchingParams, currentPage + 1); // запрашиваем следующую страницу
                if (nextCharactersData.results.length > 1) {
                    nextId = nextCharactersData.results[1].id; // второй на следующей странице
                    // получаем и загружаем следующую страницу в стор
                    if (change === 'next') {
                        dispatch(charactersAC.setCharacters(nextCharactersData));
                        dispatch(charactersAC.setCurrentPage(currentPage + 1));
                    }
                }
            }

        }
        // ЕСЛИ ХАРАКТЕРЫ ИЗ ЭПИЗОДА ИЛИ ИЗ ЛОКАЦИИ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (showCharactersFrom === 'episode' || showCharactersFrom === 'location') {
            // ОПРЕДЕЛЕНИЕ prevId ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if (positionTargetIdInCharacters > 0) {// если целевой ид не первый
                prevId = characters[positionTargetIdInCharacters - 1].id
            } else {
                prevId = null
            }
            // ОПРЕДЕЛЕНИЕ nextId //////////////////////////////////////////////////////////////////////////////////////////////
            if (positionTargetIdInCharacters < characters.length - 1) { //целевой ид не последний
                nextId = characters[positionTargetIdInCharacters + 1].id;
            } else {
                nextId = null;
            }
        }
        dispatch(charactersAC.setAroundId(prevId, nextId));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
}

export default charactersReducer;