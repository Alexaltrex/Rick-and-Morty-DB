import SearchCharacters from "./SearchCharacters";
import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import {charactersAC} from "../../../../store/characters-reducer";
import {SearchingCharactersParamsType} from "../../../../Types/Types";

const mapStateToProps = (state: StateType): MapStatePropsType => ({});

const setSearchingParams = charactersAC.setSearchingParams;
const setCurrentPage = charactersAC.setCurrentPage;
const setShowCharactersFrom = charactersAC.setShowCharactersFrom;


const SearchCharactersContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {
        setSearchingParams,
        setCurrentPage,
        setShowCharactersFrom
    })(SearchCharacters);

type MapStatePropsType = {}

type MapDispatchPropsType = {
    setSearchingParams: (searchingParams: SearchingCharactersParamsType) => void
    setCurrentPage: (currentPage: number) => void
    setShowCharactersFrom: (showCharactersFrom: 'all' | 'search' | 'episode') => void
}

export type SearchCharactersPropsType = MapStatePropsType & MapDispatchPropsType;

export default SearchCharactersContainer;
