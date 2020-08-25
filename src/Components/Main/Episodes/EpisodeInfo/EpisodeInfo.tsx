import React, {useEffect} from "react";
import {CharacterType, EpisodeType} from "../../../../Types/Types";
import {
    Avatar, Button,
    CircularProgress,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink} from "react-router-dom";


const useStyles = makeStyles({
    chip: {
        margin: 2,
    },
    button: {
        borderRadius: 28,
        padding: 2,
        paddingRight: 5,
        margin: 2,
        marginBottom: 4,
        textTransform: 'none'
    },
    avatar: {
        marginRight: 5
    }
});

type PropsType = {
    currentEpisode: EpisodeType
    isLoading: boolean
    getCurrentEpisode: (id: number) => void
    charactersOfCurrentEpisode: Array<CharacterType>
    match: any
    setCurrentItem: (currentItem: number) => void
}


const EpisodeInfo: React.FC<PropsType> = (props) => {
    const {isLoading, match, getCurrentEpisode, currentEpisode, charactersOfCurrentEpisode, setCurrentItem} = props;
    let id = match.params.id;
    const classes = useStyles();
    useEffect(() => {
        getCurrentEpisode(id);
        console.log(currentEpisode)
    }, []);

    const onClick = () => {
        setCurrentItem(2);
    }

    return (
        <>
            {currentEpisode && charactersOfCurrentEpisode &&
            <div>
                <Typography color='error' variant='h5'>
                    {currentEpisode.episode.toLocaleLowerCase()} - {currentEpisode.name}
                </Typography>
                <Typography color='textSecondary' variant='h6'>
                    The air date: {currentEpisode.air_date}
                </Typography>
                <Typography color='textPrimary' variant='h6'>
                    List of characters who have been seen in the episode:
                </Typography>
                {isLoading ? <CircularProgress/> : <div>
                    {charactersOfCurrentEpisode.map(character => <Button variant='contained'
                                                                         key={character.id}
                                                                         onClick={onClick}
                                                                         color={'default'}
                                                                         className={classes.button}
                                                                         component={RouterLink}
                                                                         to={`/characters/${character.id}`}
                                                                         size='large'>
                            <Avatar alt="" src={character.image} className={classes.avatar}/>
                            {character.name}
                        </Button>
                    )}
                </div>}
            </div>}
        </>
    )
};

export default EpisodeInfo;