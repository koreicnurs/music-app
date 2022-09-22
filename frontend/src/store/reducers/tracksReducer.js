import {FETCH_TRACKS_FAILURE, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS} from "../actions/tracksActions";


const initialState = {
    tracks: [],
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

        default:
            return state;
    }
};

export default tracksReducer;