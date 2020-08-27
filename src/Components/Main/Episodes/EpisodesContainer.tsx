import {connect} from "react-redux";
import {StateType} from "../../../store/store";
import React from "react";
import {EpisodeType, SearchingEpisodesParamsType} from "../../../Types/Types";
import Episodes from "./Episodes";
import {episodesAC, getEpisodes, getEpisodesFromSearch} from "../../../store/episodes-reducer";

type MapStatePropsType = {
    episodes: Array<EpisodeType>
    totalPagesCount: number
    showEpisodesFromSearch: boolean
    searchingParams: SearchingEpisodesParamsType
}

type MapDispatchPropsType = {
    setShowEpisodesFromSearch: (showEpisodesFromSearch: boolean) => void
    getEpisodes: () => void
    getEpisodesFromSearch: (searchingParams: SearchingEpisodesParamsType) => void
}

type OwnPropsType = {}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    episodes: state.episodes.episodes,
    totalPagesCount: state.episodes.totalPagesCount,
    showEpisodesFromSearch: state.episodes.showEpisodesFromSearch,
    searchingParams: state.episodes.searchingParams
});

const setShowEpisodesFromSearch = episodesAC.setShowEpisodesFromSearch;

const EpisodesContainer = connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps, {setShowEpisodesFromSearch, getEpisodes, getEpisodesFromSearch})(Episodes);

export default EpisodesContainer;