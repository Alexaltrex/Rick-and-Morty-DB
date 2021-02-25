export type LocationType = {
    id: number
    name: string
    type: string
    dimension: string
    residents: Array<string>
    url: string
    created: string
}

export type CharacterType = {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: OriginType
    location: OriginType
    image: string
    episode: Array<string>
    url: string
    created: string
}

type OriginType = {
    name: string
    url: string
}

export type EpisodeType = {
    id: number
    name: string
    air_date: string
    episode: string
    characters: Array<string>
    url: string
    created: string
}

export type InfoType = {
    count: number
    pages: number
    prev: string | null
    next: string | null
}

export type CharactersDataType = {
    info: InfoType
    results: Array<CharacterType>
}

export type EpisodesDataType = {
    info: InfoType
    results: Array<EpisodeType>
}

export type LocationsDataType = {
    info: InfoType
    results: Array<LocationType>
}

export type SearchingCharactersParamsType = {
    name: string,
    gender: string
    status: string
    species: string
    type: string
}

export type SearchingEpisodesParamsType = {
    name: string
    episode: string
}

export type SearchingLocationsParamsType = {
    name: string
    type: string
    dimension: string
}

export type PathParamsType = {
    id: string
}

export type GetStringKeysType<T> = Extract<keyof T, string>;

export type ShowCharactersFromType = 'all' | 'search' | 'episode' | 'location';
