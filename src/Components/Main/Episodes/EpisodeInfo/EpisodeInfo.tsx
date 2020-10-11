import React, {useEffect} from "react";
import {CharactersDataType, CharacterType, PathParamsType} from "../../../../Types/Types";
import {
    Avatar, Badge, Button,
    Grid,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink, RouteComponentProps} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MovieIcon from '@material-ui/icons/Movie';
import PeopleIcon from '@material-ui/icons/People';
import {EpisodeInfoPropsType} from "./EpisodeInfoContainer";
import Preloader from "../../../Common/Preloader";

type PropsType = EpisodeInfoPropsType & RouteComponentProps<PathParamsType>;

const EpisodeInfo: React.FC<PropsType> = (props) => {
    const {
        isLoading, match, getCurrentEpisode, currentEpisode, charactersOfCurrentEpisode,
        setCurrentSidebarMenuItem, setShowCharactersFrom,
        setCharacters, getAroundId, setShowEpisodesFrom, aroundId, showEpisodesFrom
    } = props;

    const classes = useStyles();

    const [direction, setDirection] = React.useState(null as null | 'prev' | 'next');

    useEffect(() => {
        getCurrentEpisode(+match.params.id);
        getAroundId(+match.params.id, direction);
    }, [match.params.id]);

    const onClickPrev = () => {
        setDirection('prev');
    };

    const onClickNext = () => {
        setDirection('next');
    };

    const onBackToAllEpisodes = () => {
        setShowEpisodesFrom('all');
    }

    const onCharacterClick = () => {
        setCurrentSidebarMenuItem(1);// выделяем соответствующий пункт бокового меню
        setShowCharactersFrom('episode'); // изменить источник Characters
        // записать в characters характеры из эпизода
        if (charactersOfCurrentEpisode) {
            const charactersOfCurrentEpisodeData = {} as CharactersDataType;
            charactersOfCurrentEpisodeData.results = charactersOfCurrentEpisode
                .sort((a: CharacterType, b: CharacterType) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                });
            charactersOfCurrentEpisodeData.info = {
                count: charactersOfCurrentEpisode.length,
                pages: 1,
                prev: null,
                next: null
            }
            setCharacters(charactersOfCurrentEpisodeData)
        }

    }

    return (
        <>
            <Grid container justify='space-between' className={classes.buttons}>
                <Button
                    onClick={onClickPrev}
                    className={classes.button}
                    component={RouterLink}
                    to={`/episodes/${aroundId.prevId}`}
                    disabled={!aroundId.prevId || isLoading}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<ArrowBackIcon/>}>
                    Previous episode
                </Button>

                <Button
                    onClick={onBackToAllEpisodes}
                    disabled={isLoading}
                    className={classes.button}
                    component={RouterLink}
                    to={`/episodes`}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<MovieIcon/>}>
                    Back to all episodes
                </Button>

                {(showEpisodesFrom === 'search' || showEpisodesFrom === 'character') && <Button
                    disabled={isLoading}
                    className={classes.button}
                    component={RouterLink}
                    to={`/episodes`}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<MovieIcon/>}>
                    Back to episodes from {showEpisodesFrom}
                </Button>}

                <Button
                    onClick={onClickNext}
                    className={classes.button}
                    component={RouterLink}
                    to={`/episodes/${aroundId.nextId}`}
                    disabled={!aroundId.nextId || isLoading}
                    variant="contained"
                    color="default"
                    size="medium"
                    endIcon={<ArrowForwardIcon/>}>
                    Next episode
                </Button>
            </Grid>

            {isLoading || !currentEpisode || !charactersOfCurrentEpisode || +match.params.id !== currentEpisode.id
                ? <Preloader/>
                : <>
                    <Typography color='error' variant='h5'>
                        {currentEpisode.episode.toLocaleLowerCase()} - {currentEpisode.name}
                    </Typography>

                    <Typography color='textSecondary' variant='h6'>
                        The air date: {currentEpisode.air_date}
                    </Typography>

                    <Typography color='textPrimary' variant='h6'>
                        {'List of characters who have been seen in the episode '}
                        <Badge badgeContent={charactersOfCurrentEpisode.length} color="primary" max={99999}
                               showZero>
                            <PeopleIcon/>
                        </Badge>
                    </Typography>

                    <div>
                        {charactersOfCurrentEpisode
                            .sort((a: CharacterType, b: CharacterType) => {
                                if (a.name > b.name) {
                                    return 1
                                }
                                if (a.name < b.name) {
                                    return -1
                                }
                                return 0
                            })
                            .map(character => <Button variant='contained'
                                                      key={character.id}
                                                      onClick={onCharacterClick}
                                                      color={'default'}
                                                      className={classes.characterItem}
                                                      component={RouterLink}
                                                      to={`/characters/${character.id}`}
                                                      size='large'>
                                    <Avatar alt="" src={character.image} className={classes.avatar}/>
                                    {character.name}
                                </Button>
                            )}
                    </div>
                </>
            }
        </>
    )
};

export default EpisodeInfo;

//=========================== STYLES ============================
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