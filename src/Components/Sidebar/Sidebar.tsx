import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import PersonIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/Room';
import MovieIcon from '@material-ui/icons/Movie';
import HomeIcon from '@material-ui/icons/Home';
import SidebarItemContainer from "./SidebarItem/SidebarItemContainer";
import {IconButton} from "@material-ui/core";
import {SidebarPropsType} from "./SidebarContainer";
import useTheme from "@material-ui/core/styles/useTheme";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from "@material-ui/core/Divider";
import {drawerWidth} from "../../CONST/const";

const Sidebar: React.FC<SidebarPropsType> = (props) => {
    const {setOpen, open} = props;
    const classes = useStyles();
    const theme = useTheme();
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                <SidebarItemContainer ownIndex={0} to={"/"} primary={'Home'} icon={<HomeIcon/>}/>
                <SidebarItemContainer ownIndex={1} to={"/characters"} primary={'Characters'} icon={<PersonIcon/>}/>
                <SidebarItemContainer ownIndex={2} to={"/locations"} primary={'Locations'} icon={<RoomIcon/>}/>
                <SidebarItemContainer ownIndex={3} to={"/episodes"} primary={'Episodes'} icon={<MovieIcon/>}/>
            </List>
        </Drawer>
    );
};

export default Sidebar;

//===================================== STYLES =====================================
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1
    }
}));
