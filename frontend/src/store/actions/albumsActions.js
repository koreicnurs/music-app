import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {getArtists, PUBLISH_ARTIST_FAILURE, PUBLISH_ARTIST_REQUEST, PUBLISH_ARTIST_SUCCESS} from "./artistsActions";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const FETCH_ALL_ALBUMS_REQUEST = 'FETCH_ALL_ALBUMS_REQUEST';
export const FETCH_ALL_ALBUMS_SUCCESS = 'FETCH_ALL_ALBUMS_SUCCESS';
export const FETCH_ALL_ALBUMS_FAILURE = 'FETCH_ALL_ALBUMS_FAILURE';

export const GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';

export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'CREATE_ALBUM_FAILURE';

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_ALBUM_FAILURE';

export const PUBLISH_ALBUM_REQUEST = 'PUBLISH_ALBUM_REQUEST';
export const PUBLISH_ALBUM_SUCCESS = 'PUBLISH_ALBUM_SUCCESS';
export const PUBLISH_ALBUM_FAILURE = 'PUBLISH_ALBUM_FAILURE';

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, payload: albums});
const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, payload: error});

const fetchAllAlbumsRequest = () => ({type: FETCH_ALL_ALBUMS_REQUEST});
const fetchAllAlbumsSuccess = allAlbums => ({type: FETCH_ALL_ALBUMS_SUCCESS, payload: allAlbums});
const fetchAllAlbumsFailure = error => ({type: FETCH_ALL_ALBUMS_FAILURE, payload: error});

const getAlbumRequest = () => ({type: GET_ALBUM_REQUEST});
const getAlbumSuccess = album => ({type: GET_ALBUM_SUCCESS, payload: album});
const getAlbumFailure = error => ({type: GET_ALBUM_FAILURE, payload: error});

const createAlbumRequest = () => ({type: CREATE_ALBUM_REQUEST});
const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});
const createAlbumFailure = error => ({type: CREATE_ALBUM_FAILURE, payload: error});

const deleteAlbumRequest = () => ({type: DELETE_ALBUM_REQUEST});
const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});
const deleteAlbumFailure = error => ({type: DELETE_ALBUM_FAILURE, payload: error});

const publishAlbumRequest = () => ({type: PUBLISH_ALBUM_REQUEST});
const publishAlbumSuccess = () => ({type: PUBLISH_ALBUM_SUCCESS});
const publishAlbumFailure = error => ({type: PUBLISH_ALBUM_FAILURE, payload: error});

export const getAlbums = () => {
    return async dispatch => {
        try {
            dispatch(fetchAllAlbumsRequest());

            const response = await axiosApi(`/albums`);
            dispatch(fetchAllAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(fetchAllAlbumsFailure(e.message));
        }
    }
};

export const getAlbumsAction = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());

            const response = await axiosApi(`/albums?artist=${id}`);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(fetchAlbumsFailure(e.message));
        }
    }
};

export const getAlbumAction = (id) => {
    return async dispatch => {
        try {
            dispatch(getAlbumRequest());

            const response = await axiosApi(`/albums/${id}`);
            dispatch(getAlbumSuccess(response.data));
        } catch (e) {
            dispatch(getAlbumFailure(e.message));
        }
    }
};

export const createAlbum = (albumData) => {
    return async dispatch => {
        try {
            dispatch(createAlbumRequest());
            await axiosApi.post('/albums', albumData);
            dispatch(createAlbumSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createAlbumFailure(e.response.data));
            } else {
                dispatch(createAlbumFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};

export const deleteAlbum = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteAlbumRequest());
            await axiosApi.delete('/albums/' + id);
            dispatch(deleteAlbumSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(deleteAlbumFailure(e.response.data));
            } else {
                dispatch(deleteAlbumFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};

export const publishAlbum = (id) => {
    return async dispatch => {
        try {
            dispatch(publishAlbumRequest());
            await axiosApi.put(`/albums/${id}/publish`);
            await dispatch(publishAlbumSuccess());
            dispatch(getArtists());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(publishAlbumFailure(e.response.data));
            } else {
                dispatch(publishAlbumFailure({global: 'No internet'}));
            }

            throw e;
        }
    }
};