import {FETCH_MUSIC, GET_TOKEN, FETCH_ARTIST_ALBUMS, FETCH_ARTIST_ALBUM, RESET_RESULTS} from '../actions/spotifyActions'

const initialState = {
    token: '',
    searchValue: '',
    totalResults: 0,
    searchResult: [],
    artistAlbums: [],
    artistAlbum: null,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_TOKEN:
            return {
                ...state,
                token: action.payload
            };

        case RESET_RESULTS:
            return {
                ...state,
                searchResult: action.payload
            };

        case FETCH_MUSIC:
            return {
                ...state,
                searchResult: [...state.searchResult, ...action.payload.searchResult],
                searchValue: action.payload.searchValue,
                totalResults: action.payload.totalResults
            };

        case FETCH_ARTIST_ALBUMS:
            return {
                ...state,
                artistAlbums: action.payload
            };

        case FETCH_ARTIST_ALBUM:
            return {
                ...state,
                artistAlbum: action.payload
            };

        default:
            return state
    }
};
