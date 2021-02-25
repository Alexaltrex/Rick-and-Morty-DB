import React, {useState} from "react";
import {CharacterType} from "../../../../Types/Types";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActionArea, CardContent, Grid, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Character: React.FC<PropTypes> = ({character}) => {
    const classes = useStyles();
    const [localIsLoading, setLocalIsLoading] = useState(true);
    const onLoadHandler = () => {
        setLocalIsLoading(false)
    };

    return (
        <Grid item>
            <Card className={classes.root} elevation={6}>
                <CardActionArea component={RouterLink}
                                className={classes.actionArea}
                                to={`characters/${character.id}`}>
                    {/*<CardMedia className={classes.media}*/}
                    {/*           image={character.image}*/}
                    {/*           */}
                    {/*/>*/}
                    <img src={character.image}
                         className={classes.media}
                         alt=""
                         onLoad={onLoadHandler}
                    />
                    {
                        localIsLoading &&
                            <div className={classes.preloader}>
                                <CircularProgress size={100}
                                                  color='primary'
                                />
                            </div>
                    }
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="body2" component="h6" align='center'>
                        {character.name}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
};

export default Character;

//================= TYPES =================
type PropTypes = {
    character: CharacterType
}
//================= STYLES ================
const useStyles = makeStyles({
    root: {
        width: 150,
    },
    media: {
        height: 150,
    },
    cardContent: {
        padding: 5,
        '&:last-child': {
            paddingBottom: 5
        }
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionArea: {
        position: 'relative'
    }
});



