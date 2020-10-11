import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {StateType} from "../../../../store/store";
import {CharactersDataType, CharacterType, LocationType} from "../../../../Types/Types";
import {getAroundId, getCurrentLocation, locationsAC} from "../../../../store/locations-reducer";
import LocationInfo from "./LocationInfo";
import {sidebarAC} from "../../../../store/sidebar-reducer";
import {charactersAC} from "../../../../store/characters-reducer";

type MapStatePropsType = {
    currentLocation: LocationType | null
    charactersOfCurrentLocation: Array<CharacterType> | null
    isLoading: boolean
    aroundId: { prevId: null | number, nextId: null | number }
    showLocationsFrom: 'all' | 'search'
}

type MapDispatchPropsType = {
    getCurrentLocation: (id: number) => void
    setCurrentSidebarMenuItem: (currentItem: number) => void
    setShowLocationsFrom: (showLocationsFrom: 'all' | 'search') => void
    getAroundId: (targetId: number, change: null | 'prev' | 'next') => void
    setCharacters: (charactersData: CharactersDataType) => void
    setShowCharactersFrom: (showCharactersFrom: 'all' | 'search' | 'episode' | 'location') => void
}

export type LocationInfoPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    currentLocation: state.locations.currentLocation,
    isLoading: state.app.isLoading,
    charactersOfCurrentLocation: state.locations.charactersOfCurrentLocation,
    aroundId: state.locations.aroundId,
    showLocationsFrom: state.locations.showLocationsFrom
});

const setCurrentSidebarMenuItem = sidebarAC.setCurrentSidebarMenuItem;
const setShowLocationsFrom = locationsAC.setShowLocationsFrom;
const setCharacters = charactersAC.setCharacters;
const setShowCharactersFrom = charactersAC.setShowCharactersFrom;

const LocationInfoContainer = compose<React.ComponentType>(connect<MapStatePropsType,
    MapDispatchPropsType, {}, StateType>(mapStateToProps,
    {
        getCurrentLocation, setCurrentSidebarMenuItem,
        setShowLocationsFrom,
        getAroundId, setCharacters, setShowCharactersFrom
    }), withRouter)(LocationInfo);

export default LocationInfoContainer;