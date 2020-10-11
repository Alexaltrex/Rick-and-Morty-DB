import React from 'react';
import Typography from "@material-ui/core/Typography";
import logo from './../../../assets/logo.png'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center'
    },
    img: {
        maxWidth: 300,
        width: '100%',
        marginTop: 20
    }
}));

const Home: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography color='primary' variant="h6" align='center'>
                Welcome to Rick and Morty DB
            </Typography>
            <div>
                <img className={classes.img} src={logo} alt=""/>
            </div>

        </div>
    )
};

export default Home;