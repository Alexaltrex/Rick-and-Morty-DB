import * as React from "react";
import {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardMedia,
    CircularProgress,
    Grid, List, ListItem,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PeopleIcon from '@material-ui/icons/People';
import {CharacterType, EpisodeType} from "../../../../Types/Types";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const useStyles = makeStyles({
    buttons: {
        marginTop: 5,
        marginBottom: 20
    },
    button: {
        textTransform: 'none',
    },
    card: {
        width: 300,
        borderRadius: 5,
        boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, .5)',
        marginBottom: 10
    },
    media: {
        height: 300,
    },
    paper: {
        width: 300,
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px #ccc solid',
        paddingLeft: 10,
        '&:nth-of-type(odd)': {
            backgroundColor: '#ccc',
        },
    },
    episode: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#ccc',
        },
    }

});

function ListItemLink(props: any) {
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
                <Typography color='primary' variant='subtitle1'>
                    <ListItemText primary={primary}/>
                </Typography>
            </ListItem>
        </li>
    );
}

type PropsType = {
    currentCharacter: CharacterType
    totalCharactersCount: number
    isLoading: boolean
    currentCharacterId: number
    match: any
    episodesOfCurrentCharacter: Array<EpisodeType>
    gettingIdIsStart: boolean
    idChange: 'prev' | 'next' | undefined
    getCurrentCharacter: (id: number) => void
    setCurrentCharacterId: (id: number) => void
    setCurrentItem: (currentItem: number) => void
    setGettingIdIsStart: (gettingIdIsStart: boolean, IdChange?: 'next' | 'prev') => void
    getNextOrPrevId: (currentCharacterId: number, idChange: undefined | 'next' | 'prev') => void
    }

type PropTypes = {
    leftContent: string
    rightContent: string
}

const RowCustom: React.FC<PropTypes> = (props: PropTypes) => {
    const classes = useStyles()
    const {leftContent, rightContent} = props
    return (
        <div className={classes.row}>
            <Typography variant='subtitle1'>{leftContent}</Typography>
            <Typography variant='h6' color='primary'>{rightContent}</Typography>
        </div>
    )
};

const CharacterInfo: React.FC<PropsType> = (props) => {
    const {
        currentCharacter, totalCharactersCount, match, currentCharacterId,
        getCurrentCharacter, isLoading, setCurrentCharacterId, episodesOfCurrentCharacter,
        setCurrentItem, setGettingIdIsStart, gettingIdIsStart, idChange, getNextOrPrevId} = props;

    const classes = useStyles();

    //let id = +match.params.id;
    let id = currentCharacterId

    const [localeCurrentCharacterId, setLocaleCurrentCharacterId] = useState(0);

    useEffect(() => {
        if (gettingIdIsStart) {
            // запустить санку с получением Id  с параметрами idChange и currentCharacterId
            getNextOrPrevId(currentCharacterId, idChange)
        }
    }, [gettingIdIsStart])

    useEffect(() => {
        setLocaleCurrentCharacterId(id);
        getCurrentCharacter(id);
    }, []);

    // useEffect(() => {
    //     //     if (localeCurrentCharacterId) {
    //     //         getCurrentCharacter(localeCurrentCharacterId);
    //     //     }
    //     // }, [localeCurrentCharacterId]);

    useEffect(() => {
        if (currentCharacterId) {
            getCurrentCharacter(currentCharacterId);
        }
    }, [currentCharacterId]);

    const onClickPrev = () => {
        //setLocaleCurrentCharacterId(localeCurrentCharacterId - 1);
        setGettingIdIsStart(true, 'prev');
    }

    const onClickNext = () => {
        //setLocaleCurrentCharacterId(localeCurrentCharacterId + 1);
        setGettingIdIsStart(true, 'next');
    }

    //let idNext = id + 1;
    //let idPrev = id - 1;

    const onEpisodeClick = () => {
        setCurrentItem(3);
    }

    return (
        <>
            {currentCharacter &&
            <>
                <div>{currentCharacterId}</div>
                <Grid container justify='space-between' className={classes.buttons}>
                    <Button
                        onClick={onClickPrev}
                        className={classes.button}
                        component={RouterLink}
                        to={`/characters/${id - 1}`}
                        disabled={(currentCharacter.id === 1) || isLoading} //
                        variant="contained"
                        color="default"
                        size="medium"
                        startIcon={<ArrowBackIcon/>}>
                        Previous character
                    </Button>

                    <Button
                        disabled={isLoading}
                        className={classes.button}
                        component={RouterLink}
                        to={`/characters`}
                        variant="contained"
                        color="default"
                        size="medium"
                        startIcon={<PeopleIcon/>}>
                        Back to characters
                    </Button>

                    <Button
                        onClick={onClickNext}
                        className={classes.button}
                        component={RouterLink}
                        to={`/characters/${id + 1}`}
                        disabled={(currentCharacter.id === totalCharactersCount) || isLoading}
                        variant="contained"
                        color="default"
                        size="medium"
                        endIcon={<ArrowForwardIcon/>}>
                        Next character
                    </Button>
                </Grid>

                {isLoading ? <CircularProgress size={100} color={'secondary'}/> :
                    <div>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={currentCharacter.image}/>
                        </Card>
                        <RowCustom leftContent='Name:' rightContent={currentCharacter.name}/>
                        <RowCustom leftContent='Gender:' rightContent={currentCharacter.gender}/>
                        <RowCustom leftContent='Status:' rightContent={currentCharacter.status}/>
                        <RowCustom leftContent='Species:' rightContent={currentCharacter.species}/>
                        {currentCharacter.type &&
                        <RowCustom leftContent='Subspecies:' rightContent={currentCharacter.type}/>}
                        <RowCustom leftContent='Origin location:' rightContent={currentCharacter.origin.name}/>
                        <RowCustom leftContent='Last known location endpoint:'
                                   rightContent={currentCharacter.location.name}/>

                        <Typography variant='h6' color='primary'>
                            List of episodes in which this character appeared:
                        </Typography>
                        <List>
                            {episodesOfCurrentCharacter.map(episode => <ListItemLink
                                onClick={onEpisodeClick}
                                key={episode.id}
                                to={`/episodes/${episode.id}`}
                                primary={`${episode.episode} - ${episode.name}`}>
                            </ListItemLink>)}
                        </List>
                    </div>
                }
            </>}
        </>
    )
};

export default CharacterInfo;