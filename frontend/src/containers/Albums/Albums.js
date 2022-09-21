import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {NavLink} from "react-router-dom";
import {getAlbumAction} from "../../store/actions/albumsActions";

const Albums = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albumsCombine.loading);
    const albums = useSelector(state => state.albumsCombine.albums);

    const getAlbum = (id) => {
        dispatch(getAlbumAction(id));
    };

    return loading ? <Spinner/> :  albums && (
        <>
            <div className='artists'>
                {albums.map(i => (
                    <div>
                        <p>{i.title}</p>
                        <NavLink to={`/albums/${i._id}`} onClick={() => getAlbum(i._id)}>Info</NavLink>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Albums;