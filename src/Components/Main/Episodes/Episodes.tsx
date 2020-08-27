import React, {useEffect, useState} from "react";
import {EpisodeType, SearchingEpisodesParamsType} from "../../../Types/Types";
import Episode from "./Episode/Episode";
import {Collapse, List} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import SearchEpisodesContainer from "./SearchEpisodes/SearchEpisodesContainer";

type PropTypes = {
    episodes: Array<EpisodeType>
    totalPagesCount: number
    showEpisodesFromSearch: boolean
    searchingParams: SearchingEpisodesParamsType
    getEpisodes: () => void
    setCurrentEpisode: (currentPage: number) => void
    setShowEpisodesFromSearch: (showEpisodesFromSearch: boolean) => void
    getEpisodesFromSearch: (searchingParams: SearchingEpisodesParamsType) => void

}

const useStyles = makeStyles({
    button: {
        marginRight: 10,
        textTransform: 'none'
    },
    count: {
        marginTop: 20,
        marginBottom: 20
    }
});

const Episodes: React.FC<PropTypes> = (props) => {
    const {episodes, showEpisodesFromSearch, setShowEpisodesFromSearch,
        getEpisodes, searchingParams, getEpisodesFromSearch} = props;
    const [panelIsOpen, setPanelIsOpen] = useState(false);
    const classes = useStyles();
    let episodesElements = episodes.map(item => <Episode key={item.id} episode={item}/>);
    const onSearchEpisodesClick = () => {
        setPanelIsOpen(!panelIsOpen);
    };
    const onShowAllClick = () => {
        setShowEpisodesFromSearch(false)
    }

    useEffect(() => {
        if (!showEpisodesFromSearch) {
            getEpisodes();
        } else {
            getEpisodesFromSearch(searchingParams);
            console.log('test')
        }

    }, [searchingParams.name, searchingParams.episode, showEpisodesFromSearch]);

    return (
        <>
            <Collapse in={panelIsOpen} timeout="auto" unmountOnExit>
                <SearchEpisodesContainer/>
            </Collapse>
            <Button onClick={onSearchEpisodesClick}
                    className={classes.button}
                    startIcon={panelIsOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    variant='contained'>
                {panelIsOpen ? 'Close search' : 'Open search'}
            </Button>
            <Button onClick={onShowAllClick}
                    disabled={!showEpisodesFromSearch}
                    className={classes.button}
                    variant='contained'>
                Show all
            </Button>
            <List>
                {episodesElements}
            </List>
        </>
    )
};

export default Episodes;
