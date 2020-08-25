import {connect} from "react-redux";

import SidebarItem from "./SidebarItem";
import {setCurrentItem} from "../../../store/sidebar-reducer";
import React from "react";
import {StateType} from "../../../store/store";

type MapStatePropsType = {
    currentItem: number
}

type MapDispatchPropsType = {
    setCurrentItem: (currentItem: number) => void
}

type OwnPropsType = {
    to: string
    primary: string
    icon?: React.ReactElement
    ownIndex: number
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    currentItem: state.sidebar.currentItem
});

const SidebarItemContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>
(mapStateToProps, {setCurrentItem})(SidebarItem);

export default SidebarItemContainer;

