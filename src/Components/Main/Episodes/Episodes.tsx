import Typography from "@material-ui/core/Typography";
import React, {useEffect} from "react";
import {EpisodeType} from "../../../Types/Types";
import Episode from "./Episode/Episode";
import {List} from "@material-ui/core";

type PropTypes = {
    episodes: Array<EpisodeType>
    totalPagesCount: number
    currentPage: number
    getEpisodes: (currentPage: number) => void
    setCurrentEpisode: (currentPage: number) => void
}

const Episodes: React.FC<PropTypes> = (props) => {
    const {episodes, totalPagesCount, currentPage, getEpisodes, setCurrentEpisode} = props;
    let episodesElements = episodes.map(item => <Episode key={item.id} episode={item}/>);
    useEffect(() => {
        getEpisodes(currentPage);
    }, [currentPage]);
    return (
        <List>
            {episodesElements}
        </List>
    )
};

export default Episodes;
