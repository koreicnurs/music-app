import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {getAlbumAction} from "../../store/actions/albumsActions";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const Albums = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albumsCombine.loading);
    const albums = useSelector(state => state.albumsCombine.albums);

    const getAlbum = (id) => {
        dispatch(getAlbumAction(id));
    };

    return loading ? <Spinner/> :  albums && (
        <>
            <div className='albums'>
                {albums.map(i => (
                    <div>
                        <p>{i.title}</p>
                        <Button component={Link} to={`/albums/${i._id}`} onClick={() => getAlbum(i._id)}>Info</Button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Albums;