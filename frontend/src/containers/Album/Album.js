import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Link, useHistory} from "react-router-dom";
import {getTracksAction} from "../../store/actions/tracksActions";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import './Album.css';

const Album = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.albumsCombine.loading);
    const album = useSelector(state => state.albumsCombine.album);
    const history = useHistory();

    const getTracks = (id) => {
        dispatch(getTracksAction(id));
    };

    return loading ? <Spinner/> : album && (
        <>
            <Card sx={{ maxWidth: 345 }} className='album-card'>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={album.image}
                        alt={album.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {album.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Year: {album.date}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button component={Link} to={`/tracks?album=${album._id}`}
                            onClick={() => getTracks(album._id)}>Tracks</Button>
                </CardActions>
            </Card>

            <Button onClick={history.goBack} className='back-btn'>Back</Button>
        </>
    );
};

export default Album;