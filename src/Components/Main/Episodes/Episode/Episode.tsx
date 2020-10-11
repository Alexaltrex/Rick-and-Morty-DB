import React from "react";
import {EpisodeType} from "../../../../Types/Types";
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ListItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";

function ListItemLink(props: ListItemLinkPropsType) {
    const classes = useStyles();
    const {icon, primary, to} = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );
    return (
        <li className={classes.item}>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <Typography color='primary' variant='h6'>
                    <ListItemText primary={primary}/>
                </Typography>
            </ListItem>
        </li>
    );
}

const Episode = (props: PropsType) => {
    const {episode} = props;
    return (
        <ListItemLink
            to={`/episodes/${episode.id}`}
            primary={`${episode.episode} - ${episode.name}`}>
        </ListItemLink>
    )
};

export default Episode;

//====================== TYPE =========================
type ListItemLinkPropsType = {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    children: any
}
type PropsType = {
    episode: EpisodeType
}

//===================== STYLES ========================
const useStyles = makeStyles({
    item: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#eee',
        },
    }
});