import {compose} from "redux";
import {connect} from "react-redux";
import CharacterInfo from "./CharacterInfo";
import {withRouter} from "react-router-dom";
import {StateType} from "../../../../store/store";
import {charactersAC, getAroundId, getCurrentCharacter} from "../../../../store/characters-reducer";
import {CharacterType, EpisodesDataType, EpisodeType} from "../../../../Types/Types";
import React from "react";
import {sidebarAC} from "../../../../store/sidebar-reducer";
import {episodesAC} from "../../../../store/episodes-reducer";

type MapStatePropsType = {
    currentCharacter: CharacterType | undefined | null
    isLoading: boolean
    episodesOfCurrentCharacter: Array<EpisodeType> | null
    aroundId: { prevId: null | number, nextId: null | number }
    lanError: boolean
    showCharactersFrom: 'all' | 'search' | 'episode' | 'location'
}

type MapDispatchPropsType = {
    getCurrentCharacter: (id: number) => void
    setCurrentSidebarMenuItem: (currentItem: number) => void
    getAroundId: (currentCharacterId: number, change: null | 'prev' | 'next') => void
    setShowCharactersFrom: (showCharactersFrom: 'all' | 'search' | 'episode' | 'location') => void
    setShowEpisodesFrom: (showEpisodesFrom: 'all' | 'search' | 'character') => void
    setEpisodes: (episodesData: EpisodesDataType) => void
}

export type CharactersInfoPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    isLoading: state.app.isLoading,
    lanError: state.app.lanError,
    currentCharacter: state.characters.currentCharacter,
    episodesOfCurrentCharacter: state.characters.episodesOfCurrentCharacter,
    aroundId: state.characters.aroundId,
    showCharactersFrom: state.characters.showCharactersFrom,
});

const setShowCharactersFrom = charactersAC.setShowCharactersFrom;
const setCurrentSidebarMenuItem = sidebarAC.setCurrentSidebarMenuItem;
const setShowEpisodesFrom = episodesAC.setShowEpisodesFrom;
const setEpisodes = episodesAC.setEpisodes;

const CharacterInfoContainer = compose<React.ComponentType>(connect<MapStatePropsType,
    MapDispatchPropsType,
    {},
    StateType>(mapStateToProps,
    {
        getCurrentCharacter, setCurrentSidebarMenuItem, getAroundId,
        setShowCharactersFrom, setShowEpisodesFrom, setEpisodes
    }), withRouter)(CharacterInfo);

export default CharacterInfoContainer;