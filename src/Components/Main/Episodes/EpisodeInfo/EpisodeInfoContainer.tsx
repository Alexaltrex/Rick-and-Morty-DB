import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {StateType} from "../../../../store/store";
import {CharacterType, EpisodeType} from "../../../../Types/Types";
import EpisodeInfo from "./EpisodeInfo";
import {getCurrentEpisode} from "../../../../store/episodes-reducer";
import {setCurrentItem} from "../../../../store/sidebar-reducer";

type MapStatePropsType = {
    currentEpisode: EpisodeType | undefined | null
    charactersOfCurrentEpisode: Array<CharacterType> | null
    isLoading: boolean
}

type MapDispatchPropsType = {
    getCurrentEpisode: (id: number) => void
    setCurrentItem: (currentItem: number) => void
}

type OwnPropsType = {}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    currentEpisode: state.episodes.currentEpisode,
    isLoading: state.episodes.isLoading,
    charactersOfCurrentEpisode: state.episodes.charactersOfCurrentEpisode,
});

const EpisodeInfoContainer = compose(connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps,
    {getCurrentEpisode, setCurrentItem}), withRouter)(EpisodeInfo);

export default EpisodeInfoContainer;