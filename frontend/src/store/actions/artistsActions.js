import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {historyPush} from "./historyActions";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const CREATE_ARTIST_REQUEST = 'CREATE_ARTIST_REQUEST';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';
export const CREATE_ARTIST_FAILURE = 'CREATE_ARTIST_FAILURE';

export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, payload: artists});
const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, payload: error});

const createArtistRequest = () => ({type: CREATE_ARTIST_REQUEST});
const createArtistSuccess = () => ({type: CREATE_ARTIST_SUCCESS});
const createArtistFailure = error => ({type: CREATE_ARTIST_FAILURE, payload: error});

const deleteArtistRequest = () => ({type: DELETE_ARTIST_REQUEST});
const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});
const deleteArtistFailure = error => ({type: DELETE_ARTIST_FAILURE, payload: error});

export const getArtists = () => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(fetchArtistsRequest());

            const response = await axiosApi('/artists', {headers});

            dispatch(fetchArtistsSuccess(response.data));
        } catch (e) {
            if (e.response.status === 401) {
                toast.warn('You need login!', {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            dispatch(fetchArtistsFailure(e.message));
        }
    }
};

export const createArtist = (artistData) => {
    return async dispatch => {
        try {
            dispatch(createArtistRequest());
            await axiosApi.post('/artists', artistData);
            dispatch(createArtistSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createArtistFailure(e.response.data));
            } else {
                dispatch(createArtistFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};

export const deleteArtist = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteArtistRequest());
            await axiosApi.delete('/artists/' + id);
            dispatch(deleteArtistSuccess());
            dispatch(getArtists());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(deleteArtistFailure(e.response.data));
            } else {
                dispatch(deleteArtistFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};