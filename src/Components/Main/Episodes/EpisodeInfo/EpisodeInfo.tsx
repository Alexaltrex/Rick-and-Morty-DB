import React, {useEffect, useState} from "react";
import {CharacterType, EpisodeType} from "../../../../Types/Types";
import {
    Avatar, Button,
    CircularProgress, Grid,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MovieIcon from '@material-ui/icons/Movie';

const useStyles = makeStyles({
    characterItem: {
        borderRadius: 28,
        padding: 2,
        paddingRight: 10,
        margin: 2,
        marginBottom: 4,
        textTransform: 'none'
    },
    buttons: {
        marginTop: 5,
        marginBottom: 20
    },
    button: {
        textTransform: 'none',
    },
    avatar: {
        marginRight: 5
    }
});

type PropsType = {
    currentEpisode: EpisodeType
    isLoading: boolean
    totalEpisodesCount: number
    charactersOfCurrentEpisode: Array<CharacterType>
    match: any
    setCurrentItem: (currentItem: number) => void
    getCurrentEpisode: (id: number) => void
}


const EpisodeInfo: React.FC<PropsType> = (props) => {
    const {
        isLoading, match, getCurrentEpisode, currentEpisode, charactersOfCurrentEpisode,
        totalEpisodesCount, setCurrentItem
    } = props;
    let id = +match.params.id;
    const classes = useStyles();
    const [localeCurrentEpisodeId, setLocaleCurrentEpisodeId] = useState(0);

    useEffect(() => {
        getCurrentEpisode(id);
        setLocaleCurrentEpisodeId(id);
    }, []);

    useEffect(() => {
        if (localeCurrentEpisodeId) {
            getCurrentEpisode(localeCurrentEpisodeId);
        }
    }, [localeCurrentEpisodeId]);

    const onClickPrev = () => {
        setLocaleCurrentEpisodeId(localeCurrentEpisodeId - 1);
    }

    const onClickNext = () => {
        setLocaleCurrentEpisodeId(localeCurrentEpisodeId + 1);
    }

    // let idNext = id + 1;
    //     // let idPrev = id - 1;

    const onClick = () => {
        setCurrentItem(1);
    };

    return (
        <>
            {currentEpisode && charactersOfCurrentEpisode &&
            <>
                <Grid container justify='space-between' className={classes.buttons}>
                    <Button
                        onClick={onClickPrev}
                        className={classes.button}
                        component={RouterLink}
                        to={`/episodes/${id - 1}`}
                        disabled={(currentEpisode.id === 1) || isLoading} //
                        variant="contained"
                        color="default"
                        size="medium"
                        startIcon={<ArrowBackIcon/>}>
                        Previous episode
                    </Button>

                    <Button
                        disabled={isLoading}
                        className={classes.button}
                        component={RouterLink}
                        to={`/episodes`}
                        variant="contained"
                        color="default"
                        size="medium"
                        startIcon={<MovieIcon/>}>
                        Back to episodes
                    </Button>

                    <Button
                        onClick={onClickNext}
                        className={classes.button}
                        component={RouterLink}
                        to={`/episodes/${id + 1}`}
                        disabled={(currentEpisode.id === totalEpisodesCount) || isLoading}
                        variant="contained"
                        color="default"
                        size="medium"
                        endIcon={<ArrowForwardIcon/>}>
                        Next episode
                    </Button>
                </Grid>

                {isLoading ? <CircularProgress size={100} color={'secondary'}/> :
                    <>
                        <Typography color='error' variant='h5'>
                            {currentEpisode.episode.toLocaleLowerCase()} - {currentEpisode.name}
                        </Typography>
                        <Typography color='textSecondary' variant='h6'>
                            The air date: {currentEpisode.air_date}
                        </Typography>
                        <Typography color='textPrimary' variant='h6'>
                            List of characters who have been seen in the episode:
                        </Typography>

                        {isLoading ? <CircularProgress/> : <div>
                            {charactersOfCurrentEpisode
                                .sort((a: CharacterType, b: CharacterType) => {
                                    if (a.name > b.name) {return 1}
                                    if (a.name < b.name) {return -1}
                                    return 0
                                })
                                .map(character => <Button variant='contained'
                                                                                 key={character.id}
                                                                                 onClick={onClick}
                                                                                 color={'default'}
                                                                                 className={classes.characterItem}
                                                                                 component={RouterLink}
                                                                                 to={`/characters/${character.id}`}
                                                                                 size='large'>
                                    <Avatar alt="" src={character.image} className={classes.avatar}/>
                                    {character.name}
                                </Button>
                            )}
                        </div>}
                    </>}
            </>
            }
        </>
    )
};

export default EpisodeInfo;