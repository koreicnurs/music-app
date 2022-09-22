import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {getAlbumAction} from "../../store/actions/albumsActions";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import './Albums.css';

const Albums = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albumsCombine.loading);
    const albums = useSelector(state => state.albumsCombine.albums);

    const getAlbum = (id) => {
        dispatch(getAlbumAction(id));
    };

    return loading ? <Spinner/> : albums && (
        <>
            <Typography component="div" variant="h4" className='artist-name'>
                {albums[0].artist.name}
            </Typography>
            <div className='albums'>
                {albums.map(i => (

                        <Card sx={{display: 'flex'}} className='album'>

                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent sx={{flex: '1 0 auto'}}>
                                    <Typography component="div" variant="h5">
                                        {i.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Year: {i.date}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{width: 151}}
                                image={i.image}
                                alt={i.title}
                            />
                            <Button component={Link} to={`/albums/${i._id}`}
                                    onClick={() => getAlbum(i._id)}>info</Button>

                        </Card>
                ))}
            </div>
        </>
    );
};

export default Albums;