import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {getArtists} from "../../store/actions/artistsActions";
import {getAlbumsAction} from "../../store/actions/albumsActions";
import {Link, Redirect} from "react-router-dom";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";

const TrackHistory = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.artistsCombine.loading);
    const artists = useSelector(state => state.artistsCombine.artists);
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    const getAlbums = (id) => {
        dispatch(getAlbumsAction(id));
    };

    if (!user) {
        return <Redirect to="/login"/>
    }

    return loading ? <Spinner/> : (
        <>
            <div className='artists'>
                {artists.map(i => (

                    <Card sx={{display: 'flex'}} className='artist'>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography component="div" variant="h5">
                                    {i.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {i.description}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{width: 151}}
                            image={i.image}
                            alt={i.name}
                        />
                        <Button component={Link} to={`/albums?artist=${i._id}`}
                                onClick={() => getAlbums(i._id)}>See Albums</Button>
                    </Card>

                ))}

            </div>
        </>
    );
};

export default TrackHistory;