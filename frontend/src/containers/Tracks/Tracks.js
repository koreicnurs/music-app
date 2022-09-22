import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {NavLink} from "react-router-dom";
import {getTracksAction} from "../../store/actions/tracksActions";

const Tracks = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tracksCombine.loading);
    const tracks = useSelector(state => state.tracksCombine.tracks);

    const getTrack = (id) => {
        dispatch(getTracksAction(id));
    };

    return loading ? <Spinner/> :  tracks && (
        <>
            <div className='tracks'>
                {tracks.map(i => (
                    <div>
                        <p>{i.title}</p>
                        <NavLink to={`/tracks/${i._id}`} onClick={() => getTrack(i._id)}>Info</NavLink>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Tracks;