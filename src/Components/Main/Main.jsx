import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {Route} from "react-router-dom";
import CharactersContainer from "./Characters/CharactersContainer";
import CharacterInfoContainer from "./Characters/CharacterInfo/CharacterInfoContainer";
import EpisodesContainer from "./Episodes/EpisodesContainer";
import EpisodeInfoContainer from "./Episodes/EpisodeInfo/EpisodeInfoContainer";
import LocationsContainer from "./Locations/LocationsContainer";
import LocationInfoContainer from "./Locations/LocationInfo/LocationInfoContainer";


const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Main = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <Toolbar/>
            <Route exact path='/characters' component={CharactersContainer}/>
            <Route path='/characters/:id' render={() => <CharacterInfoContainer/>}/>
            <Route exact path='/locations' component={LocationsContainer}/>
            <Route path='/locations/:id' render={() => <LocationInfoContainer/>}/>
            <Route exact path='/episodes' component={EpisodesContainer}/>
            <Route path='/episodes/:id' component={EpisodeInfoContainer}/>
        </main>
    );
};

export default Main;