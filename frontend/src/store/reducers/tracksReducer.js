import {
    FETCH_TRACKS_FAILURE,
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS,
    GET_TRACK_FAILURE,
    GET_TRACK_REQUEST,
    GET_TRACK_SUCCESS
} from "../actions/tracksActions";


const initialState = {
    tracks: [],
    track: null,
    loading: false,
    error: null,
};

const tracksReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true};
        case FETCH_TRACKS_SUCCESS:
            return {...state, loading: false, tracks: actions.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case GET_TRACK_REQUEST:
            return {...state, loading: true};
        case GET_TRACK_SUCCESS:
            return {...state, loading: false, track: actions.payload};
        case GET_TRACK_FAILURE:
            return {...state, loading: false, error: actions.payload};

        default:
            return state;
    }
};

export default tracksReducer;