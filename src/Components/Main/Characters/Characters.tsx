import React, {useEffect, useState} from "react";
import Character from "./Character/Character";
import Paginator from "../../Common/Paginator";
import {
    Badge,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SearchCharactersContainer from "./SearchCharacters/SearchCharactersContainer";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import PeopleIcon from '@material-ui/icons/People';
import {CharactersPropsType} from "./CharactersContainer";
import Preloader from "../../Common/Preloader";

const Characters: React.FC<CharactersPropsType> = (props) => {
    const {
        characters, totalPagesCount, currentPage,
        getCharacters, setCurrentPage, totalCharactersCount,
        getCharactersFromSearch, searchingParams, isLoading,
        lanError, setShowCharactersFrom, showCharactersFrom, currentEpisode,
        currentLocation
    } = props;

    const classes = useStyles();
    const [panelIsOpen, setPanelIsOpen] = useState(false);

    useEffect(() => {
        if (showCharactersFrom === 'all') {
            getCharacters(currentPage);
        }
        if (showCharactersFrom === 'search') {
            getCharactersFromSearch(searchingParams, currentPage)
        }

    }, [currentPage, searchingParams.status, searchingParams.species,
        searchingParams.name, searchingParams.gender, searchingParams.type, showCharactersFrom]);

    let charactersElements = characters.map(item => <Character key={item.id}
                                                               character={item}/>);

    const onPaginatorItemClick = (currentPage: number) => {
        setCurrentPage(currentPage);
    };

    const onSearchCharactersClick = () => {
        setPanelIsOpen(!panelIsOpen);
    };

    const onShowAllClick = () => {
        setShowCharactersFrom('all')
        setCurrentPage(1);
    };

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (lanError) {
            setOpen(true)
        }
    }, [lanError])

    const handleOk = () => {
        setOpen(false);
    };


    return (
        <>
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    open={open}
                >
                    <DialogTitle id="confirmation-dialog-title">Error</DialogTitle>
                    <DialogContent>
                        Some error occurred on the network
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleOk} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Collapse in={panelIsOpen} timeout="auto" unmountOnExit>
                    <SearchCharactersContainer/>
                </Collapse>

                <Button onClick={onSearchCharactersClick}
                        className={classes.button}
                        startIcon={panelIsOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        variant='contained'>
                    {panelIsOpen ? 'Close search' : 'Open search'}
                </Button>
                <Button onClick={onShowAllClick}
                        disabled={showCharactersFrom === 'all'}
                        className={classes.button}
                        variant='contained'>
                    Show all
                </Button>

                {showCharactersFrom === 'episode' && <div className={classes.count}>
                    {`List of the characters from episode: ${currentEpisode.episode} - ${currentEpisode.name}`}
                </div>}

                {showCharactersFrom === 'location' && <div className={classes.count}>
                    {currentLocation && `List of the characters from location: ${currentLocation.name}`}
                </div>}

                {showCharactersFrom === 'search' && <div className={classes.count}>
                    {'List of the characters from search'}
                </div>}

                <div className={classes.count}>
                    {`Total characters count: `}
                    <Badge badgeContent={totalCharactersCount} color="primary" max={99999} showZero>
                        <PeopleIcon/>
                    </Badge>
                </div>

                {!characters.length || showCharactersFrom === 'episode' || showCharactersFrom === 'location' ? null :
                    <Paginator totalPaginatorPagesCount={totalPagesCount}
                               onPaginatorItemClick={onPaginatorItemClick}
                               currentPage={currentPage}
                    />}
            </div>

            {isLoading
                ? <Preloader/>
                : <Grid container alignContent='stretch' justify='space-between' wrap='wrap' spacing={1}>
                    {charactersElements}
                </Grid>}
        </>
    )
};

export default Characters;

//=================== STYLES ==========================
const useStyles = makeStyles({
    button: {
        marginRight: 10,
        textTransform: 'none'
    },
    count: {
        marginTop: 20,
        marginBottom: 10
    },
});
