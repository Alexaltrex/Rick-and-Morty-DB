import * as React from "react";
import {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardMedia,
    CircularProgress, createStyles,
    Grid, List, ListItem,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableRow, Theme, withStyles
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
    image: {},
});

function ListItemLink(props: any) {
    const { icon, primary, to } = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );
    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <Typography color='primary' variant='h6'>
                    <ListItemText primary={primary} />
                </Typography>
            </ListItem>
        </li>
    );
}

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

type PropsType = {
    currentCharacter: CharacterType
    totalCharactersCount: number
    isLoading: boolean
    currentCharacterId: number
    getCurrentCharacter: (id: number) => void
    setCurrentCharacterId: (id: number) => void
    match: any
    episodesOfCurrentCharacter: Array<EpisodeType>
}

const TableRowCustom = (ceilLeftContent: string, ceilRightContent: string) => {
    return (
        <TableRow>
            <TableCell>{ceilLeftContent}</TableCell>
            <TableCell>{ceilRightContent}</TableCell>
        </TableRow>
    )
};

const CharacterInfo: React.FC<PropsType> = (props) => {
    const {
        currentCharacter, totalCharactersCount, match, currentCharacterId,
        getCurrentCharacter, isLoading, setCurrentCharacterId, episodesOfCurrentCharacter
    } = props;

    const classes = useStyles();
    let id = +match.params.id;

    const [localeCurrentCharacterId, setLocaleCurrentCharacterId] = useState(0);

    useEffect(() => {
        setLocaleCurrentCharacterId(id);
        getCurrentCharacter(id);
    }, []);

    useEffect(() => {

        if (localeCurrentCharacterId) {
            getCurrentCharacter(localeCurrentCharacterId);
        }
    }, [localeCurrentCharacterId]);

    const onClickPrev = () => {
        setLocaleCurrentCharacterId(localeCurrentCharacterId - 1);
    }

    const onClickNext = () => {
        setLocaleCurrentCharacterId(localeCurrentCharacterId + 1);
    }
    let idNext = id + 1;
    let idPrev = id - 1;

    return (
        <div>
            {currentCharacter &&
            <div>
                <Grid container justify='space-between' className={classes.buttons}>
                    <Button
                        onClick={onClickPrev}
                        className={classes.button}
                        component={RouterLink}
                        to={`/characters/${idPrev}`}
                        disabled={(currentCharacter.id === 1) || isLoading} //
                        variant="contained"
                        color="default"
                        size="medium"
                        startIcon={<ArrowBackIcon/>}
                    >
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
                        startIcon={<PeopleIcon/>}
                    >
                        Back to characters
                    </Button>

                    <Button
                        onClick={onClickNext}
                        className={classes.button}
                        component={RouterLink}
                        to={`/characters/${idNext}`}
                        disabled={(currentCharacter.id === totalCharactersCount) || isLoading}
                        variant="contained"
                        color="default"
                        size="medium"
                        endIcon={<ArrowForwardIcon/>}
                    >
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
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {TableRowCustom('Name', currentCharacter.name)}
                                    {TableRowCustom('Gender', currentCharacter.gender)}
                                    {TableRowCustom('Status', currentCharacter.status)}
                                    {TableRowCustom('Species', currentCharacter.species)}
                                    {currentCharacter.type && TableRowCustom('Subspecies', currentCharacter.type)}
                                    {TableRowCustom('Origin location', currentCharacter.origin.name)}
                                    {TableRowCustom('Last known location endpoint', currentCharacter.location.name)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <List>
                            {episodesOfCurrentCharacter.map(episode => <ListItemLink
                                to={`/episodes/${episode.id}`}
                                primary={`${episode.episode} - ${episode.name}`}>
                            </ListItemLink> )}
                        </List>
                    </div>


                }


            </div>}
        </div>
    )
};

export default CharacterInfo;