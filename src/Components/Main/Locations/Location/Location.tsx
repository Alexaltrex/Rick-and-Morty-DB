import React from "react";
import {LocationType} from "../../../../Types/Types";
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ListItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";

const ListItemLink: React.FC<ListItemLinkProps> = (props) => {
    const classes = useStyles();
    const {icon, primary, to, onClick} = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );
    return (
        <li className={classes.item}>
            <ListItem onClick={onClick} button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <Typography color='primary' variant='h6'>
                    <ListItemText primary={primary}/>
                </Typography>
            </ListItem>
        </li>
    );
}

const Location: React.FC<PropsType> = (props) => {
    const {location, setCurrentLocationId} = props;
    const onClick = () => {
        setCurrentLocationId(location.id)
    };
    return (
        <ListItemLink
            to={`/locations/${location.id}`}
            onClick={onClick}
            primary={location.name}>
        </ListItemLink>
    )
};

export default Location;

//============== TYPES ===============
type ListItemLinkProps = {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    children: any
    onClick: () => void
}
type PropsType = {
    location: LocationType
    setCurrentLocationId: (id: number | null) => void
};

//================== STYLES ==================
const useStyles = makeStyles({
    item: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#eee',
        },
    }
});