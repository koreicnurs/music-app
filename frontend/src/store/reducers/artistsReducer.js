import {
    CREATE_ARTIST_FAILURE,
    CREATE_ARTIST_REQUEST,
    CREATE_ARTIST_SUCCESS,
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS
} from "../actions/artistsActions";


const initialState = {
    artists: [],
    loading: false,
    error: null,
    createArtistError: null,
    createArtistLoading: false
};

const artistsReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case FETCH_ARTISTS_REQUEST:
            return {...state, loading: true};
        case FETCH_ARTISTS_SUCCESS:
            return {...state, loading: false, artists: actions.payload};
        case FETCH_ARTISTS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case CREATE_ARTIST_REQUEST:
            return {...state, createArtistLoading: true};
        case CREATE_ARTIST_SUCCESS:
            return {...state, createArtistLoading: false};
        case CREATE_ARTIST_FAILURE:
            return {...state, createArtistError: actions.payload, createArtistLoading: false};

        default:
            return state;
    }
};

export default artistsReducer;