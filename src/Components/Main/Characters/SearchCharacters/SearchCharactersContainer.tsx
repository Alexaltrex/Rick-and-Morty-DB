import SearchCharacters from "./SearchCharacters";
import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import {charactersAC} from "../../../../store/characters-reducer";
import {SearchingCharactersParamsType} from "../../../../Types/Types";

const mapStateToProps = (state: StateType): MapStatePropsType => ({

});

const setShowCharactersFromSearch = charactersAC.setShowCharactersFromSearch;
const setSearchingParams = charactersAC.setSearchingParams;
const setCurrentPage = charactersAC.setCurrentPage;

const SearchCharactersContainer = connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps, {setShowCharactersFromSearch, setSearchingParams, setCurrentPage})(SearchCharacters);

type MapStatePropsType = {

}

type MapDispatchPropsType = {
    setShowCharactersFromSearch: (showCharactersFromSearch: boolean) => void
    setSearchingParams: (searchingParams: SearchingCharactersParamsType) => void
    setCurrentPage: (currentPage: number) => void
}

type OwnPropsType = {

}

export default SearchCharactersContainer;
