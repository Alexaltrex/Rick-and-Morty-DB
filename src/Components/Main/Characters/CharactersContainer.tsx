import Characters from "./Characters";
import {connect} from "react-redux";
import {StateType} from "../../../store/store";
import {CharacterType, EpisodeType, LocationType, SearchingCharactersParamsType} from "../../../Types/Types";
import {charactersAC, getCharacters, getCharactersFromSearch} from "../../../store/characters-reducer";
import React from "react";

type MapStatePropsType = {
    characters: Array<CharacterType>
    totalPagesCount: number
    currentPage: number
    searchingParams: SearchingCharactersParamsType
    isLoading: boolean
    lanError: boolean
    totalCharactersCount: number
    showCharactersFrom: 'all' | 'search' | 'episode' | 'location'
    currentEpisode: EpisodeType
    currentLocation: null | LocationType
}

type MapDispatchPropsType = {
    getCharacters: (currentPage: number) => void
    setCurrentPage: (currentPage: number) => void
    getCharactersFromSearch: (searchingParams: SearchingCharactersParamsType, currentPage: number) => void
    setShowCharactersFrom: (showCharactersFrom: 'all' | 'search' | 'episode' | 'location') => void
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    characters: state.characters.characters,
    totalPagesCount: state.characters.totalPagesCount,
    currentPage: state.characters.currentPage,
    searchingParams: state.characters.searchingParams,
    isLoading: state.app.isLoading,
    lanError: state.app.lanError,
    totalCharactersCount: state.characters.totalCharactersCount,
    showCharactersFrom: state.characters.showCharactersFrom,
    currentEpisode: state.episodes.currentEpisode,
    currentLocation: state.locations.currentLocation
});

export type CharactersPropsType = MapStatePropsType & MapDispatchPropsType

const setCurrentPage = charactersAC.setCurrentPage;
const setShowCharactersFrom = charactersAC.setShowCharactersFrom;


const CharactersContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {
        getCharacters, setCurrentPage, getCharactersFromSearch,
        setShowCharactersFrom
    })(Characters);

export default CharactersContainer;