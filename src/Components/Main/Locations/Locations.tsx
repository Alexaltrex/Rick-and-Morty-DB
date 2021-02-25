import React, {useEffect, useState} from "react";
import {Badge, CircularProgress, Collapse, List} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import Location from './Location/Location'
import {LocationsPropsType} from "./LocationsContainer";
import RoomIcon from '@material-ui/icons/Room';
import SearchLocationsContainer from "./SearchLocations/SearchLocationsContainer";
import useCommonQueryParams from "../../../Hooks/useCommonQueryParams";

const Locations: React.FC<LocationsPropsType> = (props) => {
    useCommonQueryParams();
    const {
        locations, getLocations, searchingParams, getLocationsFromSearch,
        showLocationsFrom, setShowLocationsFrom, totalLocationsCount,
        setCurrentLocationId, isLoading
    } = props;

    const [panelIsOpen, setPanelIsOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState('All');

    const classes = useStyles();

    const locationsElements = locations.map(item => {
        if (selectedLetter === 'All') return <Location key={item.id} location={item}
                                                       setCurrentLocationId={setCurrentLocationId}/>
        if (selectedLetter !== 'All' && item.name[0] === selectedLetter) {
            return <Location key={item.id} location={item} setCurrentLocationId={setCurrentLocationId}/>
        }
    });

    const alphabetCustom = [] as Array<string>;
    locations.forEach(location => {
        if (!alphabetCustom.includes(location.name[0])) {
            alphabetCustom.push(location.name[0])
        }
    });
    alphabetCustom.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    alphabetCustom.push('All');

    const arrayOfButtons = alphabetCustom.map(item => {
        const onAlphabetButtonClick = () => {
            setSelectedLetter(item);
        };
        const className = (item === selectedLetter)
            ? `${classes.alphabetButton} ${classes.selected}`
            : `${classes.alphabetButton}`
        return <Button className={className}
                       onClick={onAlphabetButtonClick}
                       key={item}
                       size='small'
                       variant='outlined'>
            {item}
        </Button>
    });

    const onSearchClick = () => {
        setPanelIsOpen(!panelIsOpen);

    };

    const onShowAllClick = () => {
        setShowLocationsFrom('all');
        setSelectedLetter('All');
    }

    useEffect(() => {
        if (showLocationsFrom === 'all') {
            getLocations();
        }
        if (showLocationsFrom === 'search') {
            getLocationsFromSearch(searchingParams);
            setSelectedLetter('All')
        }

    }, [searchingParams.name, searchingParams.type, searchingParams.dimension, showLocationsFrom]);
    //
    return (
        <>
            <div>
                <Collapse in={panelIsOpen} timeout="auto" unmountOnExit>
                    <SearchLocationsContainer/>
                </Collapse>

                <Button onClick={onSearchClick}
                        className={classes.button}
                        startIcon={panelIsOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        variant='contained'>
                    {panelIsOpen ? 'Close search' : 'Open search'}
                </Button>
                <Button onClick={onShowAllClick}
                        disabled={showLocationsFrom === 'all'}
                        className={classes.button}
                        variant='contained'>
                    Show all
                </Button>

                {showLocationsFrom === 'search' && <div className={classes.count}>
                    {'List of the locations from search'}
                </div>}

                <div className={classes.count}>
                    {`Total locations count: `}
                    <Badge badgeContent={totalLocationsCount} color="primary" max={99999} showZero>
                        <RoomIcon/>
                    </Badge>
                </div>

                <div>
                    {arrayOfButtons}
                </div>

            </div>

            {isLoading
                ? <div className={classes.circular}>
                    <CircularProgress size={100} color={'secondary'}/>
                </div>
                : <List>
                    {locationsElements}
                </List>
            }
        </>
    )
};

export default Locations;

//=============================== STYLES ========================
const useStyles = makeStyles({
    button: {
        marginRight: 10,
        textTransform: 'none'
    },
    count: {
        marginTop: 20,
        marginBottom: 20
    },
    alphabetButton: {
        minWidth: 30,
        width: 30,
        height: 30,
        padding: 0,
        borderRadius: 15,
        textTransform: 'none'
    },
    circular: {
        display: 'flex',
        justifyContent: 'center'
    },
    selected: {
        backgroundColor: '#ccc'
    }
});
