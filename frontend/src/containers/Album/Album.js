import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {NavLink} from "react-router-dom";
import {getAlbumAction} from "../../store/actions/albumsActions";
import {getTracksAction} from "../../store/actions/tracksActions";

const Album = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albumsCombine.loading);
    const album = useSelector(state => state.albumsCombine.album);

    const getTracks = (id) => {
        dispatch(getTracksAction(id));
    };

    return loading ? <Spinner/> :  album && (
        <>
            <div className='album'>
                <p>{album.title}</p>
                <p>{album.date}</p>
                <NavLink to={`/tracks?album=${album._id}`} onClick={() => getTracks(album._id)}>Tracks</NavLink>
            </div>
        </>
    );
};

export default Album;