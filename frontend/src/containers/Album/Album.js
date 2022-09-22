import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Link} from "react-router-dom";
import {getTracksAction} from "../../store/actions/tracksActions";
import {Button} from "@mui/material";

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
                <Button component={Link} to={`/tracks?album=${album._id}`} onClick={() => getTracks(album._id)}>Tracks</Button>
            </div>
        </>
    );
};

export default Album;