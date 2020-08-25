import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import PersonIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/Room';
import MovieIcon from '@material-ui/icons/Movie';
import SidebarItemContainer from "./SidebarItem/SidebarItemContainer";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const Sidebar = () => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>

            <div className={classes.drawerContainer}>

                <List>
                    <SidebarItemContainer ownIndex={1} to={"/characters"} primary={'Characters'} icon={<PersonIcon/>}/>
                    <SidebarItemContainer ownIndex={2} to={"/locations"} primary={'Locations'} icon={<RoomIcon/>}/>
                    <SidebarItemContainer ownIndex={3} to={"/episodes"} primary={'Episodes'} icon={<MovieIcon/>}/>
                </List>

            </div>
        </Drawer>
    );
}

export default Sidebar;