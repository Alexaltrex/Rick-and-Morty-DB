import axios from "axios";
import {
    CharactersDataType,
    CharacterType,
    EpisodesDataType,
    EpisodeType, LocationsDataType, LocationType,
    SearchingCharactersParamsType, SearchingEpisodesParamsType, SearchingLocationsParamsType,

} from "../Types/Types";

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

    async searchCharacters(searchingParams: SearchingCharactersParamsType, currentPage: number) {
        let str = '';
        if (searchingParams.name) str = `${str}name=${searchingParams.name}`;
        if (searchingParams.gender) str = `${str}&gender=${searchingParams.gender}`;
        if (searchingParams.status) str = `${str}&status=${searchingParams.status}`;
        if (searchingParams.species) str = `${str}&species=${searchingParams.species}`;
        if (searchingParams.type) str = `${str}&type=${searchingParams.type}`;
        str = `${str}&page=${currentPage}`
        let response = await instance.get<CharactersDataType>(`character/?${str}`);
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
    },
    async searchEpisodes(searchingParams: SearchingEpisodesParamsType, currentPage = 1) {
        let str = '';
        if (searchingParams.name) str = `${str}name=${searchingParams.name}`;
        if (searchingParams.episode) str = `${str}&episode=${searchingParams.episode}`;
        str = `${str}&page=${currentPage}`
        let response = await instance.get<EpisodesDataType>(`episode/?${str}`);
        return response.data

    }
};

export const locationsAPI = {
    async getLocations(currentPage = 1) {
        let response = await instance.get<LocationsDataType>(`location/?page=${currentPage}`);
        return response.data
    },
    async getCurrentLocation(id: number) {
        let response = await instance.get<LocationType>(`location/${id}`);
        return response.data
    },
    async getLocationByUrl(url: string) {
        let response = await axios.get<LocationType>(url);
        return response.data
    },
    async searchLocations(searchingParams: SearchingLocationsParamsType, currentPage = 1) {
        let str = '';
        if (searchingParams.name) str = `${str}name=${searchingParams.name}`;
        if (searchingParams.type) str = `${str}&episode=${searchingParams.type}`;
        if (searchingParams.dimension) str = `${str}&episode=${searchingParams.dimension}`;
        str = `${str}&page=${currentPage}`;
        let response = await instance.get<LocationsDataType>(`location/?${str}`);
        return response.data
    }
};