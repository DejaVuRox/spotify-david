import axios from 'axios'
import {set, get} from 'local-storage'

export const GET_TOKEN = 'GET_TOKEN'
export const FETCH_MUSIC = 'FETCH_MUSIC'
export const FETCH_ARTIST_ALBUMS = 'FETCH_ARTIST_ALBUMS'
export const FETCH_ARTIST_ALBUM = 'FETCH_ARTIST_ALBUM'
export const RESET_RESULTS = 'RESET_RESULTS'

export const getToken = () => async (dispatch) => {
    try {
        const clientSecret = btoa('d530539a1fc748c885a06c9755fe88ac:b61b96d94e9b495fb3d14da3d6c4d5e7')
        const tokenRequest = await axios('https://accounts.spotify.com/api/token', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${clientSecret}`
            },
            'data': 'grant_type=client_credentials'
        })
        const token = tokenRequest.data.access_token

        dispatch({
            type: GET_TOKEN,
            payload: token
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const searchMusic = (search, offset, isLocalstorage) => async (dispatch, getState) => {
    const searchResult = get(search)
    const newOffset = searchResult?.length || offset
    const currentSearchResult = getState().spotify.searchResult
    const totalResults = getState().spotify.totalResults

    if (searchResult && isLocalstorage) {

        dispatch({
            type: FETCH_MUSIC,
            payload: {searchResult, searchValue: search, totalResults}
        })
        return
    }

    try {
        const token = getState().spotify.token
        const searchResponse = await axios(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=15&offset=${newOffset}`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            'data': 'grant_type=client_credentials'
        })
        const searchResult = searchResponse.data.artists.items
        const totalResults = searchResponse.data.artists.total

        set(search, [...currentSearchResult, ...searchResult])

        dispatch({
            type: FETCH_MUSIC,
            payload: {searchResult, searchValue: search, totalResults}
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const resetSearch = () => ({
    type: RESET_RESULTS,
    payload: []
})

export const selectArtist = (id) => async (dispatch, getState) => {
    try {
        const token = getState().spotify.token
        const selectedArtistResponse = await axios(`https://api.spotify.com/v1/artists/${id}/albums?limit=6`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            'data': 'grant_type=client_credentials'
        })
        const selectedArtistResult = selectedArtistResponse.data.items

        dispatch({
            type: FETCH_ARTIST_ALBUMS,
            payload: selectedArtistResult
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const selectAAlbum = (id) => async (dispatch, getState) => {
    try {
        const token = getState().spotify.token
        const selectedAlbumResponse = await axios(`https://api.spotify.com/v1/albums/${id}`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            'data': 'grant_type=client_credentials'
        })
        const selectedAlbumResult = selectedAlbumResponse.data

        dispatch({
            type: FETCH_ARTIST_ALBUM,
            payload: selectedAlbumResult
        })
    }
    catch (e) {
        console.log(e)
    }
}
