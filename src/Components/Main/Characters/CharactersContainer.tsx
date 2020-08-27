import Characters from "./Characters";
import {connect} from "react-redux";
import {StateType} from "../../../store/store";
import {CharacterType, SearchingCharactersParamsType} from "../../../Types/Types";
import {charactersAC, getCharacters, getCharactersFromSearch} from "../../../store/characters-reducer";
import React from "react";

type MapStatePropsType = {
    characters: Array<CharacterType>
    totalPagesCount: number
    currentPage: number
    showCharactersFromSearch: boolean
    searchingParams: SearchingCharactersParamsType
    isLoading: boolean
    searchError: boolean
    totalCharactersCount: number
}

type MapDispatchPropsType = {
    getCharacters: (currentPage: number) => void
    setCurrentPage: (currentPage: number) => void
    setShowCharactersFromSearch: (showCharactersFromSearch: boolean) => void
    getCharactersFromSearch: (searchingParams: SearchingCharactersParamsType, currentPage: number) => void
    setSearchError: (searchError: boolean) => void
    setCurrentCharacterId: (currentCharacterId: number) => void
}

type OwnPropsType = {}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    characters: state.characters.characters,
    totalPagesCount: state.characters.totalPagesCount,
    currentPage: state.characters.currentPage,
    showCharactersFromSearch: state.characters.showCharactersFromSearch,
    searchingParams: state.characters.searchingParams,
    isLoading: state.characters.isLoading,
    searchError: state.characters.searchError,
    totalCharactersCount: state.characters.totalCharactersCount
    });

const setCurrentPage = charactersAC.setCurrentPage;
const setShowCharactersFromSearch = charactersAC.setShowCharactersFromSearch;
const setSearchError = charactersAC.setSearchError;
const setCurrentCharacterId = charactersAC.setCurrentCharacterId;

const CharactersContainer = connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps, {getCharacters, setCurrentPage,
    setShowCharactersFromSearch, getCharactersFromSearch,
    setSearchError, setCurrentCharacterId})(Characters);

export default CharactersContainer;