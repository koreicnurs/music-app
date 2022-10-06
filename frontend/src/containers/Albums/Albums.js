import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {deleteAlbum, getAlbumAction, publishAlbum} from "../../store/actions/albumsActions";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import './Albums.css';
import {apiUrl} from "../../config";

const Albums = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albumsCombine.loading);
    const albums = useSelector(state => state.albumsCombine.albums);
    const user = useSelector(state => state.users.user);
    const history = useHistory();

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

                    <Card sx={{display: 'flex'}} className='album' key={i._id}>
                        {i.public === false && user.role !== 'admin' ? null :
                            <>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{flex: '1 0 auto'}}>
                                        <Typography component="div" variant="h5">
                                            {i.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Year: {i.date}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {i.public === false ? 'Not Publish' : 'Publish'}
                                        </Typography>
                                        {user?.role === 'admin' &&
                                            <Button onClick={() => dispatch(publishAlbum(i._id))}>Make Public</Button>
                                        }
                                    </CardContent>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{width: 151}}
                                    image={apiUrl + '/' + i.image}
                                    alt={i.title}
                                />
                                <Button component={Link} to={`/albums/${i._id}`}
                                        onClick={() => getAlbum(i._id)}>info</Button>
                                {user?.role === 'admin' &&
                                    <Button onClick={() => dispatch(deleteAlbum(i._id))}>Delete</Button>
                                }
                            </>
                        }

                    </Card>
                ))}
            </div>
            <Button onClick={history.goBack} className='back-btn'>Back</Button>
        </>
    );
};

export default Albums;