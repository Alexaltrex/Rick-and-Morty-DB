import React, {useEffect} from "react";
import {
    Avatar, Badge, Button,
    Grid,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink, RouteComponentProps} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RoomIcon from '@material-ui/icons/Room';
import PeopleIcon from '@material-ui/icons/People';
import {LocationInfoPropsType} from "./LocationInfoContainer";
import {CharactersDataType, CharacterType, PathParamsType} from "../../../../Types/Types";
import Preloader from "../../../Common/Preloader";
import RowCustom from "../../../Common/RowCustom";

const LocationInfo: React.FC<PropsType> = (props) => {
    const {
        isLoading, match, getCurrentLocation, currentLocation, charactersOfCurrentLocation,
        setCurrentSidebarMenuItem, setShowLocationsFrom, getAroundId, aroundId,
        showLocationsFrom, setCharacters, setShowCharactersFrom,
    } = props;

    const classes = useStyles();

    const [direction, setDirection] = React.useState(null as null | 'prev' | 'next');

    useEffect(() => {
        getCurrentLocation(+match.params.id);
        getAroundId(+match.params.id, direction);

    }, [match.params.id]);

    const onClickPrev = () => {
        setDirection('prev');
    };

    const onClickNext = () => {
        setDirection('next');
    };

    const onCharacterClick = () => {
        setCurrentSidebarMenuItem(1);// выделяем соответствующий пункт бокового меню
        setShowCharactersFrom('location'); // изменить источник Characters

        // записать в characters характеры из локации
        if (charactersOfCurrentLocation) {
            const charactersOfCurrentLocationData = {} as CharactersDataType;
            charactersOfCurrentLocationData.results = charactersOfCurrentLocation
                .sort((a: CharacterType, b: CharacterType) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                });
            charactersOfCurrentLocationData.info = {
                count: charactersOfCurrentLocation.length,
                pages: 1,
                prev: null,
                next: null
            };
            setCharacters(charactersOfCurrentLocationData)
        }

    }

    const onBackToAllLocations = () => {
        setShowLocationsFrom('all');
    }

    return (
        <>
            <Grid container justify='space-between' className={classes.buttons}>
                <Button
                    onClick={onClickPrev}
                    className={classes.button}
                    component={RouterLink}
                    to={`/locations/${aroundId.prevId}`}
                    disabled={!aroundId.prevId || isLoading} //
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<ArrowBackIcon/>}>
                    Previous location
                </Button>

                <Button
                    onClick={onBackToAllLocations}
                    disabled={isLoading}
                    className={classes.button}
                    component={RouterLink}
                    to={`/locations`}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<RoomIcon/>}>
                    Back to all locations
                </Button>

                {(showLocationsFrom === 'search') && <Button
                    disabled={isLoading}
                    className={classes.button}
                    component={RouterLink}
                    to={`/locations`}
                    variant="contained"
                    color="default"
                    size="medium"
                    startIcon={<PeopleIcon/>}>
                    Back to locations from search
                </Button>}

                <Button
                    onClick={onClickNext}
                    className={classes.button}
                    component={RouterLink}
                    to={`/locations/${aroundId.nextId}`}
                    disabled={!aroundId.nextId || isLoading}
                    variant="contained"
                    color="default"
                    size="medium"
                    endIcon={<ArrowForwardIcon/>}>
                    Next location
                </Button>
            </Grid>

            { isLoading || !currentLocation || !charactersOfCurrentLocation || +match.params.id !== currentLocation.id
                ? <Preloader/>
                : <>
                    <Typography color='error' variant='h5' className={classes.titleOfList}>
                        {currentLocation.name}
                    </Typography>

                    <RowCustom leftContent='The type of the location:' rightContent={currentLocation.type}/>
                    <RowCustom leftContent='The dimension in which the location is located:' rightContent={currentLocation.dimension}/>

                    <div className={classes.titleOfList}>
                        <Typography variant='h6' color='secondary' component='span'>
                        {'List of character who have been last seen in the location '}
                        </Typography>
                        <Badge badgeContent={charactersOfCurrentLocation.length} color="primary" max={99999}
                               showZero>
                            <PeopleIcon/>
                        </Badge>
                    </div>

                    <div>
                        {charactersOfCurrentLocation
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

export default LocationInfo;

//======================= TYPES ===========================
type PropsType = LocationInfoPropsType & RouteComponentProps<PathParamsType>;

//======================= STYLES ==========================
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
    },
    titleOfList: {
        padding: 10
    }
});