import {connect} from "react-redux";
import {StateType} from "../../../../store/store";
import {locationsAC} from "../../../../store/locations-reducer";
import SearchLocations from "./SearchLocations";
import {SearchingLocationsParamsType} from "../../../../Types/Types";

const mapStateToProps = (state: StateType): MapStatePropsType => ({});

const setSearchingParams = locationsAC.setSearchingParams;
//const setCurrentPage = charactersAC.setCurrentPage;
const setShowLocationsFrom = locationsAC.setShowLocationsFrom;


const SearchLocationsContainer = connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {setSearchingParams, setShowLocationsFrom})(SearchLocations);

type MapStatePropsType = {}

type MapDispatchPropsType = {
    setSearchingParams: (searchingParams: SearchingLocationsParamsType) => void
    //setCurrentPage: (currentPage: number) => void
    setShowLocationsFrom: (showLocationsFrom: 'all' | 'search') => void
}

export type SearchLocationsPropsType = MapStatePropsType & MapDispatchPropsType;

export default SearchLocationsContainer;
