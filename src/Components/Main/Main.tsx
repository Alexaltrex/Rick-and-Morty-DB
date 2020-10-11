import React, {Suspense} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {Route, Switch} from "react-router-dom";
import CharactersContainer from "./Characters/CharactersContainer";
import CharacterInfoContainer from "./Characters/CharacterInfo/CharacterInfoContainer";
import EpisodeInfoContainer from "./Episodes/EpisodeInfo/EpisodeInfoContainer";
import LocationsContainer from "./Locations/LocationsContainer";
import LocationInfoContainer from "./Locations/LocationInfo/LocationInfoContainer";
import {MainPropsType} from "./MainContainer";
import clsx from "clsx";
import {drawerWidth} from "../../CONST/const";
import Home from "./Home/Home";
import PageNotFound from "../Common/PageNotFound";
import Preloader from "../Common/Preloader";

const EpisodesContainer = React.lazy(() => import ('./Episodes/EpisodesContainer'))

const Main: React.FC<MainPropsType> = (props) => {
    const {open} = props;
    const classes = useStyles();

    return (
        <main className={clsx(classes.content, {
            [classes.contentShift]: open,
        })}>
            <div className={classes.drawerHeader}/>
            <Suspense fallback={<Preloader/>}>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/characters' component={CharactersContainer}/>
                    <Route path='/characters/:id' render={() => <CharacterInfoContainer/>}/>
                    <Route exact path='/locations' component={LocationsContainer}/>
                    <Route path='/locations/:id' render={() => <LocationInfoContainer/>}/>
                    <Route exact path='/episodes' component={EpisodesContainer}/>
                    <Route path='/episodes/:id' component={EpisodeInfoContainer}/>
                    <Route path='*' render={() => <PageNotFound/>}/>
                </Switch>
            </Suspense>
        </main>
    );
};

export default Main;

//================================= STYLES ======================================
const useStyles = makeStyles((theme: Theme) => ({
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
}));