import React, {useEffect, useState} from "react";
import {EpisodeType} from "../../../Types/Types";
import Episode from "./Episode/Episode";
import {Collapse, List} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/core/SvgIcon/SvgIcon";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {makeStyles} from "@material-ui/core/styles";

type PropTypes = {
    episodes: Array<EpisodeType>
    totalPagesCount: number
    currentPage: number
    getEpisodes: (currentPage: number) => void
    setCurrentEpisode: (currentPage: number) => void
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
    const {episodes, totalPagesCount, currentPage, getEpisodes, setCurrentEpisode} = props;
    const [panelIsOpen, setPanelIsOpen] = useState(false);
    const classes = useStyles();
    let episodesElements = episodes.map(item => <Episode key={item.id} episode={item}/>);
    const onSearchEpisodesClick = () => {
        setPanelIsOpen(!panelIsOpen);
    };
    const onShowAllClick = () => {
        //setShowCharactersFromSearch(false)
        //setCurrentPage(1);
    }
    useEffect(() => {
        getEpisodes(currentPage);
    }, [currentPage]);
    return (
        <>
            <Collapse in={panelIsOpen} timeout="auto" unmountOnExit>
                Test
            </Collapse>
            <Button onClick={onSearchEpisodesClick}
                    className={classes.button}
                    startIcon={panelIsOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    variant='contained'>
                {panelIsOpen ? 'Close search' : 'Open search'}
            </Button>
            <Button onClick={onShowAllClick}
                    // disabled={!showEpisodesFromSearch}
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
