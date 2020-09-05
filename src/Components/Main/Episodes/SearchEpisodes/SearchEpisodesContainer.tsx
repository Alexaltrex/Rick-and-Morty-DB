import SearchEpisodes from "./SearchEpisodes";
import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import {SearchingEpisodesParamsType} from "../../../../Types/Types";
import {episodesAC} from "../../../../store/episodes-reducer";

const mapStateToProps = (state: StateType): MapStatePropsType => ({

});

const setShowEpisodesFrom = episodesAC.setShowEpisodesFrom;
const setSearchingParams = episodesAC.setSearchingParams;

const SearchEpisodesContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {setShowEpisodesFrom, setSearchingParams})(SearchEpisodes);

type MapStatePropsType = {}

type MapDispatchPropsType = {
    setShowEpisodesFrom: (showEpisodesFrom: 'all' | 'search') => void
    setSearchingParams: (searchingParams: SearchingEpisodesParamsType) => void
   }

export type SearchEpisodesPropsType = MapStatePropsType & MapDispatchPropsType;

export default SearchEpisodesContainer;
