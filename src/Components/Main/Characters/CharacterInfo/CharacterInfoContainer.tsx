import {compose} from "redux";
import {connect} from "react-redux";
import CharacterInfo from "./CharacterInfo";
import {withRouter} from "react-router-dom";
import {StateType} from "../../../../store/store";
import {charactersAC, getCurrentCharacter, getNextOrPrevId} from "../../../../store/characters-reducer";
import {CharacterType, EpisodeType} from "../../../../Types/Types";
import React from "react";
import {setCurrentItem} from "../../../../store/sidebar-reducer";

type MapStatePropsType = {
    currentCharacter: CharacterType | undefined | null
    totalCharactersCount: number
    isLoading: boolean
    currentCharacterId: number | null
    episodesOfCurrentCharacter: Array<EpisodeType> | null
    gettingIdIsStart: boolean
    idChange: 'prev' | 'next' | undefined
}

type MapDispatchPropsType = {
    getCurrentCharacter: (id: number) => void
    setCurrentCharacterId: (id: number) => void
    setCurrentItem: (currentItem: number) => void
    setGettingIdIsStart: (gettingIdIsStart: boolean, idChange?: 'next' | 'prev') => void
    getNextOrPrevId: (currentCharacterId: number, idChange: undefined | 'next' | 'prev') => void
}

type OwnPropsType = {}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    currentCharacter: state.characters.currentCharacter,
    totalCharactersCount: state.characters.totalCharactersCount,
    isLoading: state.characters.isLoading,
    currentCharacterId: state.characters.currentCharacterId,
    episodesOfCurrentCharacter: state.characters.episodesOfCurrentCharacter,
    gettingIdIsStart: state.characters.gettingIdIsStart,
    idChange: state.characters.idChange
});

const setCurrentCharacterId = charactersAC.setCurrentCharacterId;
const setGettingIdIsStart = charactersAC.setGettingIdIsStart

const CharacterInfoContainer = compose(connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps,
    {getCurrentCharacter, setCurrentCharacterId,
        setGettingIdIsStart, setCurrentItem, getNextOrPrevId}), withRouter)(CharacterInfo);

export default CharacterInfoContainer;