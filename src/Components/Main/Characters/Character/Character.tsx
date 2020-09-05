import React, {useEffect} from "react";
import {CharacterType} from "../../../../Types/Types";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

type PropTypes = {
    character: CharacterType
    }

const useStyles = makeStyles({
    root: {
        width: 150,
    },
    media: {
        height: 150,
    },
});

const Character: React.FC<PropTypes> = ({character}) => {
    const classes = useStyles();

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea component={RouterLink}
                                to={`characters/${character.id}`}>
                    <CardMedia className={classes.media}
                               image={character.image}
                    />
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="body2" component="h6">
                        {character.name}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
};

export default Character;



