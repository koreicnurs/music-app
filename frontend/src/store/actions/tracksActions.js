import axiosApi from "../../axiosApi";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const GET_TRACK_REQUEST = 'GET_TRACK_REQUEST';
export const GET_TRACK_SUCCESS = 'GET_TRACK_SUCCESS';
export const GET_TRACK_FAILURE = 'GET_TRACK_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

const getTrackRequest = () => ({type: GET_TRACK_REQUEST});
const getTrackSuccess = track => ({type: GET_TRACK_SUCCESS, payload: track});
const getTrackFailure = error => ({type: GET_TRACK_FAILURE, payload: error});

export const getTracksAction = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchTracksRequest());

            const response = await axiosApi(`/tracks?album=${id}`);
            dispatch(fetchTracksSuccess(response.data));
        } catch (e) {
            dispatch(fetchTracksFailure(e.message));
        }
    }
};

export const getTrackAction = (id) => {
    return async dispatch => {
        try {
            dispatch(getTrackRequest());

            const response = await axiosApi(`/tracks/${id}`);
            dispatch(getTrackSuccess(response.data));
        } catch (e) {
            dispatch(getTrackFailure(e.message));
        }
    }
};