import {
    CREATE_TRACK_FAILURE,
    CREATE_TRACK_REQUEST,
    CREATE_TRACK_SUCCESS,
    DELETE_TRACK_FAILURE,
    DELETE_TRACK_REQUEST,
    DELETE_TRACK_SUCCESS,
    FETCH_TRACKS_FAILURE,
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS
} from "../actions/tracksActions";


const initialState = {
    tracks: [],
    loading: false,
    error: null,
    createTrackError: null,
    createArtistLoading: false
};

const tracksReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true};
        case FETCH_TRACKS_SUCCESS:
            return {...state, loading: false, tracks: actions.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case CREATE_TRACK_REQUEST:
            return {...state, createTrackLoading: true};
        case CREATE_TRACK_SUCCESS:
            return {...state, createTrackLoading: false};
        case CREATE_TRACK_FAILURE:
            return {...state, createTrackError: actions.payload, createTrackLoading: false};

        case DELETE_TRACK_REQUEST:
            return {...state, loading: true};
        case DELETE_TRACK_SUCCESS:
            return {...state, loading: false};
        case DELETE_TRACK_FAILURE:
            return {...state, error: actions.payload, loading: false};

        default:
            return state;
    }
};

export default tracksReducer;