import {connect} from "react-redux";
import {StateType} from "../../../store/store";
import {LocationType, SearchingLocationsParamsType} from "../../../Types/Types";
import {getLocations, getLocationsFromSearch, locationsAC} from "../../../store/locations-reducer";
import Locations from "./Locations";

export type MapStatePropsType = {
    locations: Array<LocationType>
    totalPagesCount: number
    searchingParams: SearchingLocationsParamsType
    showLocationsFrom: 'all' | 'search'
    totalLocationsCount: number
    isLoading: boolean
}

const setShowLocationsFrom = locationsAC.setShowLocationsFrom;
const setCurrentLocationId = locationsAC.setCurrentLocationId;

export type MapDispatchPropsType = {
    getLocations: () => void
    getLocationsFromSearch: (searchingParams: SearchingLocationsParamsType) => void
    setShowLocationsFrom: (showLocationsFrom: 'all' | 'search') => void
    setCurrentLocationId: (currentLocationId: number | null) => void
}

export type LocationsPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    locations: state.locations.locations,
    totalPagesCount: state.locations.totalPagesCount,
    searchingParams: state.locations.searchingParams,
    showLocationsFrom: state.locations.showLocationsFrom,
    totalLocationsCount: state.locations.totalLocationsCount,
    isLoading: state.app.isLoading
});

const LocationsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>
(mapStateToProps, {getLocations, getLocationsFromSearch, setShowLocationsFrom,
    setCurrentLocationId})(Locations);

export default LocationsContainer;