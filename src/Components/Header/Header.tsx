import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import lightBlue from "@material-ui/core/colors/lightBlue";
import indigo from "@material-ui/core/colors/indigo";
import {HeaderPropsType} from "./HeaderContainer";
import {drawerWidth} from "../../CONST/const";
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton} from "@material-ui/core";
import clsx from 'clsx';
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";


const Header: React.FC<HeaderPropsType> = (props) => {
    const {open, setOpen} = props;
    const classes = useStyles();

    const handleDrawerOpen = (): void => {
        setOpen(true);
    };

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
                <Link component={RouterLink}
                      to='/'
                      underline='none'
                      className={classes.link}>
                    <Typography variant="h6" noWrap>
                        Rick and Morty DB
                    </Typography>
                </Link>


            </Toolbar>
        </AppBar>
    )
}

export default Header;

//============================= STYLES ===========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        root: {
            backgroundColor: indigo[900],
            color: lightBlue[400]
        },
        link: {
            color: 'white',
        }
    }),
);


