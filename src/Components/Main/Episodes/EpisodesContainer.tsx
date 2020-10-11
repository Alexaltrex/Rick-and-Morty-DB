import {connect} from "react-redux";
import {StateType} from "../../../store/store";
import {CharacterType, EpisodeType, SearchingEpisodesParamsType} from "../../../Types/Types";
import Episodes from "./Episodes";
import {episodesAC, getEpisodes, getEpisodesFromSearch} from "../../../store/episodes-reducer";

type MapStatePropsType = {
    episodes: Array<EpisodeType>
    totalPagesCount: number
    showEpisodesFrom: 'all' | 'search' | 'character'
    searchingParams: SearchingEpisodesParamsType
    isLoading: boolean
    totalEpisodesCount: number
    currentCharacter: CharacterType | null | undefined
}

type MapDispatchPropsType = {
    setShowEpisodesFrom: (showEpisodesFrom: 'all' | 'search' | 'character') => void
    getEpisodes: () => void
    getEpisodesFromSearch: (searchingParams: SearchingEpisodesParamsType) => void
}

export type EpisodesPropsType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    episodes: state.episodes.episodes,
    totalPagesCount: state.episodes.totalPagesCount,
    showEpisodesFrom: state.episodes.showEpisodesFrom,
    searchingParams: state.episodes.searchingParams,
    isLoading: state.app.isLoading,
    totalEpisodesCount: state.episodes.totalEpisodesCount,
    currentCharacter: state.characters.currentCharacter
});

const setShowEpisodesFrom = episodesAC.setShowEpisodesFrom;

const EpisodesContainer = connect<MapStatePropsType, MapDispatchPropsType,
    {}, StateType>(mapStateToProps,
    {
        setShowEpisodesFrom, getEpisodes,
        getEpisodesFromSearch
    })(Episodes);

export default EpisodesContainer;