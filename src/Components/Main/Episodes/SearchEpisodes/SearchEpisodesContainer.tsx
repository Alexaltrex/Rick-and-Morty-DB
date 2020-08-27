import SearchEpisodes from "./SearchEpisodes";
import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import {SearchingEpisodesParamsType} from "../../../../Types/Types";
import {episodesAC} from "../../../../store/episodes-reducer";

const mapStateToProps = (state: StateType): MapStatePropsType => ({

});

const setShowEpisodesFromSearch = episodesAC.setShowEpisodesFromSearch;
const setSearchingParams = episodesAC.setSearchingParams;

const SearchEpisodesContainer = connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps, {setShowEpisodesFromSearch, setSearchingParams})(SearchEpisodes);

type MapStatePropsType = {

}

type MapDispatchPropsType = {
    setShowEpisodesFromSearch: (showEpisodesFromSearch: boolean) => void
    setSearchingParams: (searchingParams: SearchingEpisodesParamsType) => void
   }

type OwnPropsType = {

}

export default SearchEpisodesContainer;
