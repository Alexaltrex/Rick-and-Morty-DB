import {connect} from "react-redux";
import Header from "./Header";
import {appAC} from "../../store/app-reducer";
import {StateType} from "../../store/store";

const mapStateToProps = (state: StateType): MapStatePropsType  => ({
    open: state.app.open
});

const setOpen = appAC.setOpen;


const HeaderContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>
(mapStateToProps, {setOpen})(Header);

export default HeaderContainer;

//------------------------------------------------------------------------
type MapStatePropsType = {
    open: boolean
}

type MapDispatchPropsType = {
    setOpen: (open: boolean) => void
}

export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


