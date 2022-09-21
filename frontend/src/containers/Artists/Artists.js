import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {getArtists} from "../../store/actions/artistsActions";

const Artists = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.artistsCombine.loading);
    const artists = useSelector(state => state.artistsCombine.artists);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);


    return loading ? <Spinner/> : (
        <>
            <div className='artists'>
                {artists.map(i => (
                    <p>{i.name}</p>
                ))}
            </div>
        </>
    );
};

export default Artists;