import {CircularProgress} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    circular: {
        display: 'flex',
        justifyContent: 'center'
    }
});

const Preloader: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.circular}>
            <CircularProgress size={100} color={'secondary'}/>
        </div>
    )
};

export default Preloader
