import {connect} from "react-redux";
import {appAC} from "../../store/app-reducer";
import Sidebar from "./Sidebar";
import {StateType} from "../../store/store";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    open: state.app.open
});

const setOpen = appAC.setOpen;

const SidebarContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>
(mapStateToProps, {setOpen})(Sidebar);

export default SidebarContainer;

//--------------------------------------------------------------------------------------
type MapStatePropsType = {
    open: boolean
}
type MapDispatchPropsType = {
    setOpen: (open: boolean) => void
}
export type SidebarPropsType =  MapStatePropsType & MapDispatchPropsType;