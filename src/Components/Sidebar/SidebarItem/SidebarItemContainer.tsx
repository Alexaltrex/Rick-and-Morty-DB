import {connect} from "react-redux";
import SidebarItem from "./SidebarItem";
import {sidebarAC} from "../../../store/sidebar-reducer";
import React from "react";
import {StateType} from "../../../store/store";
import {charactersAC} from "../../../store/characters-reducer";
import {episodesAC} from "../../../store/episodes-reducer";
import {locationsAC} from "../../../store/locations-reducer";
import {SearchingCharactersParamsType} from "../../../Types/Types";

type MapStatePropsType = {
    currentItem: number
}

type MapDispatchPropsType = {
    setCurrentSidebarMenuItem: (currentItem: number) => void
    setShowCharactersFrom: (showCharactersFrom: 'all' | 'search' | 'episode' | 'location') => void
    setShowEpisodesFrom: (showEpisodesFrom: 'all' | 'search' | 'character') => void
    setShowLocationsFrom: (showLocationsFrom: 'all' | 'search') => void
    setCurrentPage: (currentPage: number) => void
    setSearchingParams: (searchingParams: SearchingCharactersParamsType) => void
}

export enum OwnIndexEnum {
    characters = 1,
    episodes = 2,
    locations = 3
}

type OwnPropsType = {
    to: string
    primary: string
    icon?: React.ReactElement
    ownIndex: OwnIndexEnum
}

export type SidebarItemPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    currentItem: state.sidebar.currentItem
});

const setCurrentSidebarMenuItem = sidebarAC.setCurrentSidebarMenuItem;
const setShowCharactersFrom = charactersAC.setShowCharactersFrom;
const setShowEpisodesFrom = episodesAC.setShowEpisodesFrom;
const setShowLocationsFrom = locationsAC.setShowLocationsFrom;
const setCurrentPage = charactersAC.setCurrentPage;
const setSearchingParams = charactersAC.setSearchingParams;

const SidebarItemContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>
(mapStateToProps, {
    setCurrentSidebarMenuItem,
    setShowCharactersFrom,
    setShowEpisodesFrom,
    setShowLocationsFrom,
    setCurrentPage,
    setSearchingParams
})(SidebarItem);

export default SidebarItemContainer;

