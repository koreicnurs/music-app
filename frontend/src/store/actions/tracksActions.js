import axiosApi from "../../axiosApi";
import {CREATE_ARTIST_REQUEST} from "./artistsActions";
import {historyPush} from "./historyActions";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, payload: tracks});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

const createTrackRequest = () => ({type: CREATE_TRACK_REQUEST});
const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});
const createTrackFailure = error => ({type: CREATE_TRACK_FAILURE, payload: error});

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
