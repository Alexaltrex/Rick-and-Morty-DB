import {Link as RouterLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {OwnIndexEnum, SidebarItemPropsType} from "./SidebarItemContainer";
import {makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";
import indigo from "@material-ui/core/colors/indigo";

const SidebarItem: React.FC<SidebarItemPropsType> = (props) => {
    const {to, primary, icon, currentItem, ownIndex, setCurrentSidebarMenuItem,
        setShowCharactersFrom, setShowEpisodesFrom, setShowLocationsFrom} = props;
    const classes = useStyles();
    const onClick = () => {
        setCurrentSidebarMenuItem(ownIndex);
        if (ownIndex === OwnIndexEnum.characters) {
            setShowCharactersFrom('all')
        }
        if (ownIndex === OwnIndexEnum.locations) {
            setShowLocationsFrom('all')
        }
        if (ownIndex === OwnIndexEnum.episodes) {
            setShowEpisodesFrom('all')
        }
    };

    return (
        <li>
        <ListItem
            onClick={onClick}
            selected={ownIndex === currentItem}
            button
            component={RouterLink}
            to={to}>
            {icon ? <ListItemIcon className={clsx(ownIndex === currentItem && classes.icon)}>
                {icon}
            </ListItemIcon> : null}
            <ListItemText primary={primary}/>
        </ListItem>
        </li>
    )
};

export default SidebarItem;

//=================================== STYLES =====================================
const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        color: indigo[500]
    }
}));