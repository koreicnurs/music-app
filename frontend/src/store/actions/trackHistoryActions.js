import axiosApi from "../../axiosApi";

export const SAVE_TRACKS_REQUEST = 'SAVE_TRACKS_REQUEST';
export const SAVE_TRACKS_SUCCESS = 'SAVE_TRACKS_SUCCESS';
export const SAVE_TRACKS_FAILURE = 'SAVE_TRACKS_FAILURE';

const saveTracksRequest = () => ({type: SAVE_TRACKS_REQUEST});
const saveTracksSuccess = tracks => ({type: SAVE_TRACKS_SUCCESS, payload: tracks});
const saveTracksFailure = error => ({type: SAVE_TRACKS_FAILURE, payload: error});

export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';

const getTracksRequest = () => ({type: GET_TRACKS_REQUEST});
const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, payload: tracks});
const getTracksFailure = error => ({type: GET_TRACKS_FAILURE, payload: error});

export const saveTrack = (id) => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(saveTracksRequest());

            const response = await axiosApi.post(`/track_history`,{trackId: id},{headers});

            dispatch(saveTracksSuccess(response.data));
        } catch (e) {
            dispatch(saveTracksFailure(e.message));
        }
    }
};

export const getTracksHistory = () => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(getTracksRequest());

            const response = await axiosApi(`/track_history`,{headers});

            dispatch(getTracksSuccess(response.data));
        } catch (e) {
            dispatch(getTracksFailure(e.message));
        }
    }
};
