import React, {useEffect, useState} from "react";
import Episode from "./Episode/Episode";
import {Badge, CircularProgress, Collapse, List} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import SearchEpisodesContainer from "./SearchEpisodes/SearchEpisodesContainer";
import {EpisodesPropsType} from "./EpisodesContainer";
import MovieIcon from '@material-ui/icons/Movie';
import useCommonQueryParams from "../../../Hooks/useCommonQueryParams";

const Episodes: React.FC<EpisodesPropsType> = (props) => {
    useCommonQueryParams();
    const {
        episodes, showEpisodesFrom, setShowEpisodesFrom,
        getEpisodes, searchingParams, getEpisodesFromSearch,
        isLoading, totalEpisodesCount, currentCharacter
    } = props;

    const [panelIsOpen, setPanelIsOpen] = useState(false);

    const classes = useStyles();

    let episodesElements = episodes.map(item => <Episode key={item.id} episode={item}/>);

    const onSearchEpisodesClick = () => {
        setPanelIsOpen(!panelIsOpen);
    };

    const onShowAllClick = () => {
        setShowEpisodesFrom('all')
    };

    useEffect(() => {
        if (showEpisodesFrom === 'all') {
            getEpisodes();
        }
        if (showEpisodesFrom === 'search') {
            getEpisodesFromSearch(searchingParams);
        }
    }, [searchingParams.name, searchingParams.episode, showEpisodesFrom]);

    return (
        <>
            <div>
                <Collapse in={panelIsOpen} timeout="auto" unmountOnExit>
                    <SearchEpisodesContainer/>
                </Collapse>
            </div>

            <Button onClick={onSearchEpisodesClick}
                    className={classes.button}
                    startIcon={panelIsOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    variant='contained'>
                {panelIsOpen ? 'Close search' : 'Open search'}
            </Button>

            <Button onClick={onShowAllClick}
                    disabled={showEpisodesFrom === 'all'}
                    className={classes.button}
                    variant='contained'>
                Show all
            </Button>

            {showEpisodesFrom === 'search' && <div className={classes.count}>
                {'List of the episodes from search'}
            </div>}

            {showEpisodesFrom === 'character' && <div className={classes.count}>
                {currentCharacter && `List of the episodes in which this character have been seen: ${currentCharacter.name}`}
            </div>}

            <div className={classes.count}>
                {`Total episodes count: `}
                <Badge badgeContent={totalEpisodesCount} color="primary" max={99999} showZero>
                    <MovieIcon/>
                </Badge>
            </div>

            {isLoading
                ? <div className={classes.circular}>
                    <CircularProgress size={100} color={'secondary'}/>
                </div>
                : <List>
                    {episodesElements}
                </List>}
        </>
    )
};

export default Episodes;

//============================= STYLES ======================
const useStyles = makeStyles({
    button: {
        marginRight: 10,
        textTransform: 'none'
    },
    count: {
        marginTop: 20,
        marginBottom: 20
    },
    circular: {
        display: 'flex',
        justifyContent: 'center'
    }
});
