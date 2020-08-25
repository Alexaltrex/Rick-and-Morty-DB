import {Link as RouterLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import React from "react";
import ListItem from "@material-ui/core/ListItem";

type PropsType = {
    to: string
    primary: string
    icon?: React.ReactElement
    currentItem: number
    ownIndex: number
    setCurrentItem: (currentItem: number) => void
}


const SidebarItem: React.FC<PropsType> = ({to, primary, icon, currentItem, ownIndex, setCurrentItem}) => {
    const onClick = () => {
        setCurrentItem(ownIndex);
    }

    return (
        <li>
        <ListItem
            onClick={onClick}
            selected={ownIndex === currentItem}
            button
            component={RouterLink}
            to={to}>
            {icon ? <ListItemIcon color='primary'>
                {icon}
            </ListItemIcon> : null}
            <ListItemText primary={primary}/>
        </ListItem>
        </li>
    )
};

export default SidebarItem;