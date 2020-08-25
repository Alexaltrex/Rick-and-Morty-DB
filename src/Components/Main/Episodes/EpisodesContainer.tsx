import {connect} from "react-redux";
import {StateType} from "../../../store/store";
import React from "react";
import {EpisodeType} from "../../../Types/Types";
import Episodes from "./Episodes";
import {episodesAC, getEpisodes} from "../../../store/episodes-reducer";

type MapStatePropsType = {
    episodes: Array<EpisodeType>
    totalPagesCount: number
    currentPage: number
}

type MapDispatchPropsType = {
    getEpisodes: (currentPage: number) => void
    setCurrentPage: (currentPage: number) => void
}

type OwnPropsType = {}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    episodes: state.episodes.episodes,
    totalPagesCount: state.episodes.totalPagesCount,
    currentPage: state.episodes.currentPage
});

const setCurrentPage = episodesAC.setCurrentPage;

const EpisodesContainer = connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps, {getEpisodes, setCurrentPage})(Episodes);

export default EpisodesContainer;