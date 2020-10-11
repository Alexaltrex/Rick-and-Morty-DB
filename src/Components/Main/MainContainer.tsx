import {connect} from "react-redux";
import Main from "./Main";
import {StateType} from "../../store/store";

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    open: state.app.open
});

const MainContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>
(mapStateToProps, {})(Main);

export default MainContainer;

//--------------------------TYPES---------------------------------------------
type MapStatePropsType = {
    open: boolean
}

type MapDispatchPropsType = {}

export type MainPropsType = MapStatePropsType & MapDispatchPropsType;