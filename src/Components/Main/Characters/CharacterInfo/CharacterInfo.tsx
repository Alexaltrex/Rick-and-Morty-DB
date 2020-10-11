import React from "react";
import {useEffect} from "react";
import {
    Badge,
    Button,
    Card, CardMedia,
    Grid, List, ListItem,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink, LinkProps as RouterLinkProps, RouteComponentProps} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PeopleIcon from '@material-ui/icons/People';
import {EpisodesDataType, PathParamsType} from "../../../../Types/Types";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {Redirect} from "react-router-dom";
import MovieIcon from '@material-ui/icons/Movie';
import {CharactersInfoPropsType} from "./CharacterInfoContainer";
import RowCustom from "../../../Common/RowCustom";
import Preloader from "../../../Common/Preloader";

const ListItemLink: React.FC<ListItemLinkPropsType> = (props) => {
    const classes = useStyles()
    const {icon, primary, to, onClick} = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );
    return (
        <li className={classes.episode}>
            <ListItem button component={renderLink} onClick={onClick}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <Typography color='textPrimary' variant='subtitle1'>
                    <ListItemText primary={primary}/>
                </Typography>
            </ListItem>
        </li>
    );
}

const CharacterInfo: React.FC<PropsType> = (props) => {
    const {
        currentCharacter, match, getCurrentCharacter, isLoading,
        episodesOfCurrentCharacter, setCurrentSidebarMenuItem, getAroundId, aroundId,
        lanError, showCharactersFrom, setShowCharactersFrom, setShowEpisodesFrom,
        setEpisodes
    } = props;

    const classes = useStyles();

    const [direction, setDirection] = React.useState(null as null | 'prev' | 'next');

    useEffect(() => {
        getCurrentCharacter(+match.params.id);
        getAroundId(+match.params.id, direction);
    }, [match.params.id]);

    const onClickPrev = () => {
        setDirection('prev');
    };

    const onClickNext = () => {
        setDirection('next');
    }

    const onEpisodeClick = () => {
        setCurrentSidebarMenuItem(3);
        setShowEpisodesFrom('character');
        // записать в episodes эпизоды из характера
        if (episodesOfCurrentCharacter) {
            const episodesOfCurrentCharacterData = {} as EpisodesDataType;
            episodesOfCurrentCharacterData.results = episodesOfCurrentCharacter

            episodesOfCurrentCharacterData.info = {
                count: episodesOfCurrentCharacter.length,
                pages: 1,
                prev: null,
                next: null
            }
            setEpisodes(episodesOfCurrentCharacterData)
        }
    };

    const onBackToAllCharacters = () => {
        setShowCharactersFrom('all');
    }

    if (lanError) {
        return <Redirect to="/characters"/>
    }

    return (
        <>
            <Grid container justify='space-between'>
                <Button
                    onClick={onClickPrev}
                    className={classes.button}
                    component={RouterLink}
                    to={`/characters/${aroundId.prevId}`}
                    disabled={!aroundId.prevId || isLoading}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<ArrowBackIcon/>}>
                    Previous character
                </Button>

                <Button
                    onClick={onBackToAllCharacters}
                    disabled={isLoading}
                    className={classes.button}
                    component={RouterLink}
                    to={`/characters`}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<PeopleIcon/>}>
                    Back to all characters
                </Button>

                {(showCharactersFrom === 'search' || showCharactersFrom === 'episode' || showCharactersFrom === 'location') &&
                <Button
                    disabled={isLoading}
                    className={classes.button}
                    component={RouterLink}
                    to={`/characters`}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<PeopleIcon/>}>
                    Back to characters from {showCharactersFrom}
                </Button>}

                <Button
                    onClick={onClickNext}
                    className={classes.button}
                    component={RouterLink}
                    to={`/characters/${aroundId.nextId}`}
                    disabled={!aroundId.nextId || isLoading}
                    variant="contained"
                    color="default"
                    size="medium"
                    endIcon={<ArrowForwardIcon/>}>
                    Next character
                </Button>
            </Grid>

            {(isLoading || !currentCharacter || !episodesOfCurrentCharacter
                || +match.params.id !== currentCharacter.id)
                ? <Preloader/>
                : <div>
                    <div className={classes.characterInfoBlock}>
                        <div className={classes.cardContainer}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={currentCharacter.image}/>
                                <Typography color='error' variant='h5' className={classes.name}>
                                    {currentCharacter.name}
                                </Typography>
                            </Card>
                        </div>

                        <div className={classes.characterInfo}>
                            <RowCustom leftContent='Gender:' rightContent={currentCharacter.gender}/>
                            <RowCustom leftContent='Status:' rightContent={currentCharacter.status}/>
                            <RowCustom leftContent='Species:' rightContent={currentCharacter.species}/>
                            {currentCharacter.type &&
                            <RowCustom leftContent='Subspecies:' rightContent={currentCharacter.type}/>}
                            <RowCustom leftContent='Origin location:' rightContent={currentCharacter.origin.name}/>
                            <RowCustom leftContent='Last known location endpoint:'
                                       rightContent={currentCharacter.location.name}/>

                            <div className={classes.titleOfList}>
                                <Typography variant='h6' color='secondary' component='span'>
                                    {'List of episodes in which this character appeared: '}
                                </Typography>
                                <Badge badgeContent={episodesOfCurrentCharacter.length} color="secondary" max={99999}
                                       showZero>
                                    <MovieIcon/>
                                </Badge>
                            </div>

                            <List>
                                {episodesOfCurrentCharacter.map(episode => <ListItemLink
                                    onClick={onEpisodeClick}
                                    key={episode.id}
                                    to={`/episodes/${episode.id}`}
                                    primary={`${episode.episode} - ${episode.name}`}>
                                </ListItemLink>)}
                            </List>

                        </div>

                    </div>

                </div>
            }
        </>
    )
};

export default CharacterInfo;

//=================== TYPES =====================
type ListItemLinkPropsType = {
    icon?: React.ReactElement
    primary: string
    to: string
    onClick: () => void
    children: any
};
type PropsType = CharactersInfoPropsType & RouteComponentProps<PathParamsType>;

//=================== STYLES ====================
const useStyles = makeStyles({
    button: {
        textTransform: 'none',
        marginBottom: 10
    },
    card: {
        width: 300,
        borderRadius: 5,
        boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, .5)',
        marginBottom: 10,
        marginRight: 20
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    media: {
        height: 300,
    },
    paper: {
        width: 300,
    },
    episode: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#ccc',
        },
    },
    titleOfList: {
        padding: 10
    },
    name: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    characterInfoBlock: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    characterInfo: {
        flexGrow: 1
    }
});
