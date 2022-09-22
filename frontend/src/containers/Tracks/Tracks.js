import React from 'react';
import {useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Tracks = () => {
    const loading = useSelector(state => state.tracksCombine.loading);
    const tracks = useSelector(state => state.tracksCombine.tracks);

    return loading ? <Spinner/> : tracks && (
        <>
            <div className='tracks'>
                {tracks.map(i => (
                    <div>
                        <p>{i.title}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Tracks;