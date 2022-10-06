import {
    CREATE_ALBUM_FAILURE,
    CREATE_ALBUM_REQUEST,
    CREATE_ALBUM_SUCCESS,
    DELETE_ALBUM_FAILURE,
    DELETE_ALBUM_REQUEST,
    DELETE_ALBUM_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS,
    FETCH_ALL_ALBUMS_FAILURE,
    FETCH_ALL_ALBUMS_REQUEST,
    FETCH_ALL_ALBUMS_SUCCESS,
    GET_ALBUM_FAILURE,
    GET_ALBUM_REQUEST,
    GET_ALBUM_SUCCESS,
    PUBLISH_ALBUM_FAILURE,
    PUBLISH_ALBUM_REQUEST,
    PUBLISH_ALBUM_SUCCESS
} from "../actions/albumsActions";


const initialState = {
    albums: [],
    album: null,
    allAlbums: [],
    loading: false,
    error: null,
    createAlbumError: null,
    createAlbumLoading: false
};

const albumsReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case FETCH_ALBUMS_REQUEST:
            return {...state, loading: true};
        case FETCH_ALBUMS_SUCCESS:
            return {...state, loading: false, albums: actions.payload};
        case FETCH_ALBUMS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case FETCH_ALL_ALBUMS_REQUEST:
            return {...state, loading: true};
        case FETCH_ALL_ALBUMS_SUCCESS:
            return {...state, loading: false, allAlbums: actions.payload};
        case FETCH_ALL_ALBUMS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case GET_ALBUM_REQUEST:
            return {...state, loading: true};
        case GET_ALBUM_SUCCESS:
            return {...state, loading: false, album: actions.payload};
        case GET_ALBUM_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case CREATE_ALBUM_REQUEST:
            return {...state, createAlbumLoading: true};
        case CREATE_ALBUM_SUCCESS:
            return {...state, createAlbumLoading: false};
        case CREATE_ALBUM_FAILURE:
            return {...state, createAlbumError: actions.payload, createAlbumLoading: false};

        case DELETE_ALBUM_REQUEST:
            return {...state, loading: true};
        case DELETE_ALBUM_SUCCESS:
            return {...state, loading: false};
        case DELETE_ALBUM_FAILURE:
            return {...state, error: actions.payload, loading: false};

        case PUBLISH_ALBUM_REQUEST:
            return {...state, loading: true};
        case PUBLISH_ALBUM_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_ALBUM_FAILURE:
            return {...state, error: actions.payload, loading: false};

        default:
            return state;
    }
};

export default albumsReducer;