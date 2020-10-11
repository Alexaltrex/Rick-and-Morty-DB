import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import HeaderContainer from "./Components/Header/HeaderContainer";
import MainContainer from "./Components/Main/MainContainer";
import SidebarContainer from "./Components/Sidebar/SidebarContainer";
import ErrorBoundary from "./Components/Common/ErrorBoundary";

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ErrorBoundary>
                <HeaderContainer/>
                <SidebarContainer/>
                <MainContainer/>
            </ErrorBoundary>
        </div>
    );
}

export default App;

//=================== STYLE =======================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        }
    }),
);
