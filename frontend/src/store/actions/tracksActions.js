import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {getArtists, PUBLISH_ARTIST_FAILURE, PUBLISH_ARTIST_REQUEST, PUBLISH_ARTIST_SUCCESS} from "./artistsActions";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE';

export const DELETE_TRACK_REQUEST = 'DELETE_TRACK_REQUEST';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';
export const DELETE_TRACK_FAILURE = 'DELETE_TRACK_FAILURE';

export const PUBLISH_TRACK_REQUEST = 'PUBLISH_TRACK_REQUEST';
export const PUBLISH_TRACK_SUCCESS = 'PUBLISH_TRACK_SUCCESS';
export const PUBLISH_TRACK_FAILURE = 'PUBLISH_TRACK_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

const createTrackRequest = () => ({type: CREATE_TRACK_REQUEST});
const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});
const createTrackFailure = error => ({type: CREATE_TRACK_FAILURE, payload: error});

const deleteTrackRequest = () => ({type: DELETE_TRACK_REQUEST});
const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});
const deleteTrackFailure = error => ({type: DELETE_TRACK_FAILURE, payload: error});

const publishTrackRequest = () => ({type: PUBLISH_TRACK_REQUEST});
const publishTrackSuccess = () => ({type: PUBLISH_TRACK_SUCCESS});
const publishTrackFailure = error => ({type: PUBLISH_TRACK_FAILURE, payload: error});

export const getTracksAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(fetchTracksRequest());

            const response = await axiosApi(`/tracks?album=${id}`, {headers});
            dispatch(fetchTracksSuccess(response.data));
        } catch (e) {
            dispatch(fetchTracksFailure(e.message));
        }
    }
};

export const createTrack = (trackData) => {
    return async dispatch => {
        try {
            dispatch(createTrackRequest());
            await axiosApi.post('/tracks', trackData);
            dispatch(createTrackSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createTrackFailure(e.response.data));
            } else {
                dispatch(createTrackFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};

export const deleteTrack = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteTrackRequest());
            await axiosApi.delete('/tracks/' + id);
            dispatch(deleteTrackSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(deleteTrackFailure(e.response.data));
            } else {
                dispatch(deleteTrackFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};

export const publishTrack = (id) => {
    return async dispatch => {
        try {
            dispatch(publishTrackRequest());
            await axiosApi.put(`/tracks/${id}/publish`);
            await dispatch(publishTrackSuccess());
            dispatch(getArtists());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(publishTrackFailure(e.response.data));
            } else {
                dispatch(publishTrackFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};
