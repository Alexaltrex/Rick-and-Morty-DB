import axios from "axios";
import {CharactersDataType, CharacterType, EpisodesDataType, EpisodeType, SearchingParamsType} from "../Types/Types";

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
});

export const charactersAPI = {
    async getCharacters(currentPage = 1) {
        let response = await instance.get<CharactersDataType>(`character/?page=${currentPage}`);
        return response.data
    },
    async getCharacterByUrl(url: string) {
        let response = await axios.get<CharacterType>(url);
        return response.data
    },
    async getCurrentCharacter(id: number) {
        let response = await instance.get<CharacterType>(`character/${id}`);
        return response.data
    },

    async searchCharacters(searchingParams: SearchingParamsType, currentPage: number) {
        let str = '';
        if (searchingParams.name) str = `${str}name=${searchingParams.name}`;
        if (searchingParams.gender) str = `${str}&gender=${searchingParams.gender}`;
        if (searchingParams.status) str = `${str}&status=${searchingParams.status}`;
        if (searchingParams.species) str = `${str}&species=${searchingParams.species}`;
        if (searchingParams.type) str = `${str}&type=${searchingParams.type}`;
        str = `${str}&page=${currentPage}`
        let response = await instance.get<CharactersDataType>(`character/?${str}`);
        console.log(response)
        return response.data
    }
};

export const episodesAPI = {
    async getEpisodes(currentPage = 1) {
        let response = await instance.get<EpisodesDataType>(`episode/?page=${currentPage}`);
        return response.data
    },
    async getCurrentEpisode(id: number) {
        let response = await instance.get<EpisodeType>(`episode/${id}`);
        return response.data
    },
    async getEpisodesByUrl(url: string) {
        let response = await axios.get<EpisodeType>(url);
        return response.data
    }
};