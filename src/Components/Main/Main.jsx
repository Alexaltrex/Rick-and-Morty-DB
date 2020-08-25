import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {Route} from "react-router-dom";
import Locations from "./Locations/Locations";
import Episodes from "./Episodes/Episodes";
import CharactersContainer from "./Characters/CharactersContainer";
import CharacterInfoContainer from "./Characters/CharacterInfo/CharacterInfoContainer";
import EpisodesContainer from "./Episodes/EpisodesContainer";
import EpisodeInfo from "./Episodes/EpisodeInfo/EpisodeInfo";
import EpisodeInfoContainer from "./Episodes/EpisodeInfo/EpisodeInfoContainer";


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
            <Route path='/locations' component={Locations}/>
            <Route exact path='/episodes' component={EpisodesContainer}/>
            <Route path='/episodes/:id' component={EpisodeInfoContainer}/>
        </main>
    );
};

export default Main;