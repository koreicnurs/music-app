import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {getArtists} from "../../store/actions/artistsActions";
import {getAlbumsAction} from "../../store/actions/albumsActions";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Artists = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.artistsCombine.loading);
    const artists = useSelector(state => state.artistsCombine.artists);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    const getAlbums = (id) => {
        dispatch(getAlbumsAction(id));
    };

    return loading ? <Spinner/> : (
        <>
            <div className='artists'>
                {artists.map(i => (
                    <div>
                        <p>{i.name}</p>
                        <Button component={Link} to={`/albums?artist=${i._id}`} onClick={() => getAlbums(i._id)}>btn</Button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Artists;