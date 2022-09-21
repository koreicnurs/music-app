import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Album = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albumsCombine.loading);
    const album = useSelector(state => state.albumsCombine.album);

    return loading ? <Spinner/> :  album && (
        <>
            <div className='album'>
                <p>{album.title}</p>
                <p>{album.date}</p>
            </div>
        </>
    );
};

export default Album;