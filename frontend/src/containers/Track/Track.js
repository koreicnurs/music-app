import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Track = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tracksCombine.loading);
    const track = useSelector(state => state.tracksCombine.album);

    return loading ? <Spinner/> :  track && (
        <>
            <div className='album'>
                <p>{track.title}</p>
            </div>
        </>
    );
};

export default Track;