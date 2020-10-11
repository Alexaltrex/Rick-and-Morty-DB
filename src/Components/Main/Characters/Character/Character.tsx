import React from "react";
import {CharacterType} from "../../../../Types/Types";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

const Character: React.FC<PropTypes> = ({character}) => {
    const classes = useStyles();

    return (
        <Grid item>
            <Card className={classes.root} elevation={6}>
                <CardActionArea component={RouterLink}
                                to={`characters/${character.id}`}>
                    <CardMedia className={classes.media}
                               image={character.image}
                    />
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
    }
});



