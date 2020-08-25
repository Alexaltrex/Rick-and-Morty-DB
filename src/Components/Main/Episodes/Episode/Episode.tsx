import React from "react";
import {EpisodeType} from "../../../../Types/Types";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ListItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";


const useStyles = makeStyles({
    chip: {
        marginBottom: 5,
    },
});

type PropsType = {
    episode: EpisodeType
}

const onClick = () => {

};

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

function ListItemLink(props: any) {
    const { icon, primary, to } = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );
    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <Typography color='primary' variant='h6'>
                <ListItemText primary={primary} />
                </Typography>
            </ListItem>
        </li>
    );
}

const Episode = (props: PropsType) => {
    const classes = useStyles();
    const {episode} = props;
    return (
        <ListItemLink
                  to={`/episodes/${episode.id}`}
                  primary={`${episode.episode} - ${episode.name}`}>
            {/*<Chip label={`${episode.episode} - ${episode.name}`}*/}
            {/*      clickable*/}
            {/*      variant='outlined'*/}
            {/*      className={classes.chip}*/}
            {/*      onClick={onClick}*/}
            {/*      component={RouterLink}*/}
            {/*      to={`/episodes/${episode.id}`}*/}
            {/*      color="primary"/>*/}
            {/*<Button color="primary"*/}
            {/*        variant='outlined'*/}
            {/*        component={RouterLink}*/}
            {/*        to={`/episodes/${episode.id}`}>*/}
            {/*    {`${episode.episode} - ${episode.name}`}*/}
            {/*</Button>*/}
        </ListItemLink>
    )
};

export default Episode;