import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {createTrack} from "../../store/actions/tracksActions";
import {getAlbums} from "../../store/actions/albumsActions";
import TrackForm from "../../components/TrackForm/TrackForm";

const NewTrack = ({history}) => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.tracksCombine.createTrackError);
    const albums = useSelector(state => state.albumsCombine.allAlbums);

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    const onProductFormSubmit = async tracksData => {
        await dispatch(createTrack(tracksData));
        history.push("/");
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New Track
            </Typography>
            <TrackForm
                album={albums}
                error={error}
                onSubmit={onProductFormSubmit}
            />
        </>
    );
};

export default NewTrack;

