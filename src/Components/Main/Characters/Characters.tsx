import React, {useEffect, useState} from "react";
import {CharacterType, SearchingCharactersParamsType} from "../../../Types/Types";
import Character from "./Character/Character";
import Paginator from "../../Common/Paginator/Paginator";
import {Badge, CircularProgress, Collapse} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SearchCharactersContainer from "./SearchCharacters/SearchCharactersContainer";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {makeStyles} from "@material-ui/core/styles";
import PeopleIcon from '@material-ui/icons/People';

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

type PropTypes = {
    characters: Array<CharacterType>
    totalPagesCount: number
    currentPage: number
    showCharactersFromSearch: boolean
    searchingParams: SearchingCharactersParamsType
    isLoading: boolean
    searchError: boolean
    totalCharactersCount: number
    getCharacters: (currentPage: number) => void
    setCurrentPage: (currentPage: number) => void
    setShowCharactersFromSearch: (showCharactersFromSearch: boolean) => void
    getCharactersFromSearch: (searchingParams: SearchingCharactersParamsType, currentPage: number) => void
    setSearchError: (searchError: boolean) => void
    setCurrentCharacterId: (currentCharacterId: number) => void
}

const Characters: React.FC<PropTypes> = (props: PropTypes) => {
    const {
        characters, totalPagesCount, currentPage, totalCharactersCount,
        getCharacters, setCurrentPage, searchError,
        showCharactersFromSearch, setShowCharactersFromSearch,
        getCharactersFromSearch, searchingParams, isLoading, setSearchError,
        setCurrentCharacterId} = props;

    const classes = useStyles();
    const [panelIsOpen, setPanelIsOpen] = useState(false);

    useEffect(() => {
        if (!showCharactersFromSearch) {
            getCharacters(currentPage);
        } else {
            getCharactersFromSearch(searchingParams, currentPage)
        }

    }, [currentPage, searchingParams.status, searchingParams.species,
        searchingParams.name, searchingParams.gender, searchingParams.type, showCharactersFromSearch]);

    let charactersElements = characters.map(item => <Character key={item.id}
                                                               setCurrentCharacterId={setCurrentCharacterId}
                                                               character={item}/>);

    const onPaginatorItemClick = (currentPage: number) => {
        setCurrentPage(currentPage);
    };

    const onSearchCharactersClick = () => {
        setPanelIsOpen(!panelIsOpen);
    };

    const onShowAllClick = () => {
        setSearchError(false)
        setShowCharactersFromSearch(false)
        setCurrentPage(1);
    }

    let totalOutputCount = searchError ? 0 : totalCharactersCount;

    return (
        <>
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
                    disabled={!showCharactersFromSearch}
                    className={classes.button}
                    variant='contained'>
                Show all
            </Button>

            <div className={classes.count}>
                {`Total characters count: `}
                <Badge badgeContent={totalOutputCount} color="primary" max={99999} showZero>
                    <PeopleIcon/>
                </Badge>
            </div>


            {searchError ? null : <Paginator totalPaginatorPagesCount={totalPagesCount}
                                             onPaginatorItemClick={onPaginatorItemClick}
                                             currentPage={currentPage}
            />}
            {isLoading ? <CircularProgress size={100} color={'secondary'}/> :
                searchError ? null :
                    <Grid container alignContent='stretch' justify='space-between' wrap='wrap' spacing={1}>
                        {charactersElements}
                    </Grid>}
        </>

    )
};

export default Characters;
