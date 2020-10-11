import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {StateType} from "../../../../store/store";
import {CharactersDataType, CharacterType, EpisodeType} from "../../../../Types/Types";
import EpisodeInfo from "./EpisodeInfo";
import {episodesAC, getAroundId, getCurrentEpisode} from "../../../../store/episodes-reducer";
import {sidebarAC} from "../../../../store/sidebar-reducer";
import {charactersAC} from "../../../../store/characters-reducer";


type MapStatePropsType = {
    currentEpisode: EpisodeType | undefined | null
    charactersOfCurrentEpisode: Array<CharacterType> | null
    isLoading: boolean
    //totalEpisodesCount: number
    aroundId: {prevId: null | number, nextId: null | number}
    showEpisodesFrom: 'all' | 'search' | 'character'
}

type MapDispatchPropsType = {
    getCurrentEpisode: (id: number) => void
    setCurrentSidebarMenuItem: (currentItem: number) => void
    setShowCharactersFrom: (showCharactersFrom: 'all' | 'search' | 'episode') => void
    setCharacters: (charactersData: CharactersDataType) => void
    getAroundId: (targetId: number, change: null | 'prev' | 'next') => void
    setShowEpisodesFrom: (showEpisodesFrom: 'all' | 'search') => void
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    currentEpisode: state.episodes.currentEpisode,
    isLoading: state.app.isLoading,
    charactersOfCurrentEpisode: state.episodes.charactersOfCurrentEpisode,
    //totalEpisodesCount: state.episodes.totalEpisodesCount,
    aroundId: state.episodes.aroundId,
    showEpisodesFrom: state.episodes.showEpisodesFrom,
});

export type EpisodeInfoPropsType = MapStatePropsType & MapDispatchPropsType

const setShowCharactersFrom = charactersAC.setShowCharactersFrom;
const setCharacters = charactersAC.setCharacters;
const setCurrentSidebarMenuItem = sidebarAC.setCurrentSidebarMenuItem;
const setShowEpisodesFrom = episodesAC.setShowEpisodesFrom;

const EpisodeInfoContainer = compose<React.ComponentType>(connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {getCurrentEpisode, setCurrentSidebarMenuItem,
        setShowCharactersFrom, setCharacters, getAroundId,
        setShowEpisodesFrom}), withRouter)(EpisodeInfo);

export default EpisodeInfoContainer;