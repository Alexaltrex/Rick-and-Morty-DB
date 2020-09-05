type EmptyType = (str: string) => boolean

export const empty: EmptyType = (str) => /^\s+$/.test(str);

export type SearchCharactersErrorsType = {
    name?: string | undefined
    species?: string | undefined
    type?: string | undefined
    status?: string | undefined
    gender?: string | undefined
    _error?: string | undefined
}

export type SearchCharactersValidateType = (values: SearchCharactersFormValuesType) => SearchCharactersErrorsType

export type SearchCharactersFormValuesType = {
    name: string
    species: string
    type: string
    status: '' | 'alive' | 'dead' | 'unknown'
    gender: '' | 'female' | 'male' | 'genderless' | 'unknown'
}

///////////////////////////////////////////////////////////////////////

export type SearchEpisodesErrorsType = {
    name?: string | undefined
    episode?: string | undefined
    _error?: string | undefined
}

export type SearchEpisodesValidateType = (values: SearchEpisodesFormValuesType) => SearchEpisodesErrorsType

export type SearchEpisodesFormValuesType = {
    name: string
    episode: string
}

///////////////////////////////////////////////////////////////////////

export type SearchLocationsErrorsType = {
    name?: string | undefined
    type?: string | undefined
    dimension?: string | undefined
    _error?: string | undefined
}

export type SearchLocationsValidateType = (values: SearchLocationsFormValuesType) => SearchLocationsErrorsType

export type SearchLocationsFormValuesType = {
    name: string
    type: string
    dimension: string
}