import {compose} from "redux";
import {connect} from "react-redux";
import CharacterInfo from "./CharacterInfo";
import {Link as RouterLink, LinkProps as RouterLinkProps, withRouter} from "react-router-dom";
import {StateType} from "../../../../store/store";
import {charactersAC, getCurrentCharacter} from "../../../../store/characters-reducer";
import {CharacterType, EpisodeType} from "../../../../Types/Types";
import React from "react";
import {ListItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

type MapStatePropsType = {
    currentCharacter: CharacterType | undefined | null
    totalCharactersCount: number
    isLoading: boolean
    currentCharacterId: number | null
    episodesOfCurrentCharacter: Array<EpisodeType> | null
}

type MapDispatchPropsType = {
    getCurrentCharacter: (id: number) => void
    setCurrentCharacterId: (id: number) => void
}

type OwnPropsType = {}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    currentCharacter: state.characters.currentCharacter,
    totalCharactersCount: state.characters.totalCharactersCount,
    isLoading: state.characters.isLoading,
    currentCharacterId: state.characters.currentCharacterId,
    episodesOfCurrentCharacter: state.characters.episodesOfCurrentCharacter
});

const setCurrentCharacterId = charactersAC.setCurrentCharacterId;

const CharacterInfoContainer = compose(connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps,
    {getCurrentCharacter, setCurrentCharacterId}), withRouter)(CharacterInfo);

export default CharacterInfoContainer;