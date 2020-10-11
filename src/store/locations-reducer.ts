import {
    CharacterType,
    LocationsDataType,
    LocationType,
    SearchingLocationsParamsType
} from "../Types/Types";
import {GetActionsType, StateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {appAC, AppActionsType} from "./app-reducer";
import {charactersAPI, locationsAPI} from "../DAL/api";

const initialState = {
    locations: [] as Array<LocationType>,
    totalLocationsCount: 0,
    totalPagesCount: 0,
    currentLocation: null as null | LocationType,
    next: null as string | null,
    prev: null as string | null,
    charactersOfCurrentLocation: null as null | Array<CharacterType>,
    showLocationsFrom: 'all' as 'all' | 'search',
    searchingParams: {
        name: '', type: '', dimension: ''
    },
    currentLocationId: null as null | number,
    aroundId: {prevId: null as null | number, nextId: null as null | number},
};

export type InitialStateType = typeof initialState;

const locationsReducer = (state = initialState, action: LocationsActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOCATIONS/SET_LOCATIONS': {
            return {
                ...state,
                locations: action.locationsData.results,
                totalLocationsCount: action.locationsData.info.count,
                totalPagesCount: action.locationsData.info.pages,
                next: action.locationsData.info.next,
                prev: action.locationsData.info.prev
            }
        }
        case 'LOCATIONS/SET_CURRENT_LOCATION': {
            return {...state, currentLocation: action.currentLocation}
        }
        case 'LOCATIONS/SET_CHARACTERS_OF_CURRENT_LOCATION': {
            return {...state, charactersOfCurrentLocation: action.charactersOfCurrentLocation}
        }
        case 'LOCATIONS/SET_SEARCHING_PARAMS': {
            return {
                ...state, searchingParams: action.searchingParams
            }
        }
        case 'LOCATIONS/SET_SHOW_LOCATIONS_FROM': {
            return {...state, showLocationsFrom: action.showLocationsFrom}
        }
        case 'LOCATIONS/SET_CURRENT_LOCATION_ID': {
            return {...state, currentLocationId: action.currentLocationId}
        }
        case 'LOCATIONS/SET_AROUND_ID': {
            return {...state, aroundId: {prevId: action.prevId, nextId: action.nextId}}
        }
        default:
            return state;
    }
};

type LocationsActionsType = GetActionsType<typeof locationsAC>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, LocationsActionsType | AppActionsType>

export const locationsAC = {
    setLocations: (locationsData: LocationsDataType) => ({type: 'LOCATIONS/SET_LOCATIONS', locationsData} as const),
    setCurrentLocation: (currentLocation: LocationType | null) => ({
        type: 'LOCATIONS/SET_CURRENT_LOCATION',
        currentLocation
    } as const),
    setCharactersOfCurrentLocation: (charactersOfCurrentLocation: Array<CharacterType>) => ({
        type: 'LOCATIONS/SET_CHARACTERS_OF_CURRENT_LOCATION',
        charactersOfCurrentLocation
    } as const),
    setSearchingParams: (searchingParams: SearchingLocationsParamsType) => ({
        type: 'LOCATIONS/SET_SEARCHING_PARAMS',
        searchingParams
    } as const),
    setShowLocationsFrom: (showLocationsFrom: 'all' | 'search') => ({
        type: 'LOCATIONS/SET_SHOW_LOCATIONS_FROM', showLocationsFrom
    } as const),
    setCurrentLocationId: (currentLocationId: number | null) => ({
        type: 'LOCATIONS/SET_CURRENT_LOCATION_ID',
        currentLocationId
    } as const),
    setAroundId: (prevId: number | null, nextId: number | null) => ({
        type: 'LOCATIONS/SET_AROUND_ID',
        prevId,
        nextId
    } as const),
}

export const getLocations = (): ThunkType => async (dispatch, getState) => {
    dispatch(appAC.toggleLoading(true));
    // 1 - получение числа страниц totalPagesCount
    const resultWithTotalPageCount = await locationsAPI.getLocations();
    const totalPagesCount = resultWithTotalPageCount.info.pages;
    // 2 - получение ВСЕХ локаций
    let arrPages = [];
    for (let i = 1; i <= totalPagesCount; i++) {
        arrPages.push(i)
    }
    const arrayOfRequests = arrPages.map(pageNumber => locationsAPI.getLocations(pageNumber))
    let results = await Promise.all(arrayOfRequests);
    let data = {} as LocationsDataType;
    data.info = results[0].info;
    let resultsArray = [] as Array<LocationType>
    for (let i = 0; i < totalPagesCount; i++) {
        resultsArray = [...resultsArray, ...results[i].results]
    }
    // 3 - сортировка локаций по имени
    resultsArray.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });
    data.results = resultsArray;
    // 4 - запись ВСЕХ локаций в store
    dispatch(locationsAC.setLocations(data))
    dispatch(appAC.toggleLoading(false));
};

export const getCurrentLocation = (id: number): ThunkType => async (dispatch) => {
    dispatch(appAC.toggleLoading(true));
    let currentLocationResponse = await locationsAPI.getCurrentLocation(id);
    dispatch(locationsAC.setCurrentLocation(currentLocationResponse));
    // получение информации о персонажах, относящихся к текущей локации:
    // в currentLocation содержится только массив ссылок на персонажей
    // выполняется при монтировании компоненты LocationInfo
    const arrayOfRequests = currentLocationResponse.residents.map(url => charactersAPI.getCharacterByUrl(url))
    let results = await Promise.all(arrayOfRequests);
    dispatch(locationsAC.setCharactersOfCurrentLocation(results));
    dispatch(appAC.toggleLoading(false));
};

export const getLocationsFromSearch = (searchingParams: SearchingLocationsParamsType): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        // 1 - получение числа страниц totalPagesCount
        const resultWithTotalPageCount = await locationsAPI.searchLocations(searchingParams);
        const totalPagesCount = resultWithTotalPageCount.info.pages;
        // 2 - получение ВСЕХ локаций
        let arrPages = [];
        for (let i = 1; i <= totalPagesCount; i++) {
            arrPages.push(i)
        }
        const arrayOfRequests = arrPages.map(pageNumber => locationsAPI.searchLocations(searchingParams, pageNumber))
        let results = await Promise.all(arrayOfRequests);
        let data = {} as LocationsDataType;
        data.info = results[0].info;
        let resultsArray = [] as Array<LocationType>
        for (let i = 0; i < totalPagesCount; i++) {
            resultsArray = [...resultsArray, ...results[i].results]
        }
        data.results = resultsArray
        // 3 - запись ВСЕХ эпизодов в store
        dispatch(locationsAC.setLocations(data));
    } catch (e) {
        const locationsData = {} as LocationsDataType;
        locationsData.results = []
        locationsData.info = {
            count: 0,
            pages: 1,
            prev: null,
            next: null
        }
        dispatch(locationsAC.setLocations(locationsData));
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
        const locations = getState().locations.locations;
        // позиция id, на который переходим, целевого, в массиве locations (т.е. на текущей странице)
        // от 0 до getState().characters.characters.length - 1
        const positionTargetIdInLocations = getState().locations.locations.findIndex(el => el.id === targetId);// -1 если нет
        /////////////////////////////////////////////////////////////////////////////////////////
        if (positionTargetIdInLocations > 0) { // если целевой ид не первый
            prevId = locations[positionTargetIdInLocations - 1].id
        } else {
            prevId = null;
        }
        if (positionTargetIdInLocations < locations.length - 1) {// если целевой ид не последний
            nextId = locations[positionTargetIdInLocations + 1].id
        } else {
            nextId = null;
        }
        dispatch(locationsAC.setAroundId(prevId, nextId));
    } catch
        (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export default locationsReducer;