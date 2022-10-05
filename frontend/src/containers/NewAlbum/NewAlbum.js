import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {createAlbum} from "../../store/actions/albumsActions";

const NewAlbum = ({history}) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.albumsCombine.createArtistError);
    const artists = useSelector(state => state.artistsCombine.artists);

    const onProductFormSubmit = async albumsData => {
        await dispatch(createAlbum(albumsData));
        history.push("/");
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New Artist
            </Typography>
            <AlbumForm
                artist={artists}
                error={error}
                onSubmit={onProductFormSubmit}
            />
        </>
    );
};

export default NewAlbum;