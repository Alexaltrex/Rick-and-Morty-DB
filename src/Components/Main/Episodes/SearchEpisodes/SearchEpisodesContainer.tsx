import SearchEpisodes from "./SearchEpisodes";
import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import {charactersAC} from "../../../../store/characters-reducer";
import {SearchingParamsType} from "../../../../Types/Types";

const mapStateToProps = (state: StateType): MapStatePropsType => ({

});

const setShowCharactersFromSearch = charactersAC.setShowCharactersFromSearch;
const setSearchingParams = charactersAC.setSearchingParams;
const setCurrentPage = charactersAC.setCurrentPage;

const SearchEpisodesContainer = connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps, {setShowCharactersFromSearch, setSearchingParams, setCurrentPage})(SearchEpisodes);

type MapStatePropsType = {

}

type MapDispatchPropsType = {
    setShowCharactersFromSearch: (showCharactersFromSearch: boolean) => void
    setSearchingParams: (searchingParams: SearchingParamsType) => void
    setCurrentPage: (currentPage: number) => void
}

type OwnPropsType = {

}

export default SearchEpisodesContainer;