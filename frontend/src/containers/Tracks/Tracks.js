import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {saveTrack} from "../../store/actions/trackHistoryActions";
import {deleteTrack, publishTrack} from "../../store/actions/tracksActions";
import './Tracks.css';

const Tracks = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tracksCombine.loading);
    const tracks = useSelector(state => state.tracksCombine.tracks);
    const user = useSelector(state => state.users.user);
    const history = useHistory();

    const sendTrack = (id) => {
        dispatch(saveTrack(id));
    };

    return loading ? <Spinner/> : tracks && (
        <>
            <Typography component="div" variant="h4" className='album-title'>
                {tracks[0].album.title}
            </Typography>
            <div className='tracks'>
                {tracks.map(i => (
                    <Card sx={{display: 'flex'}} className='track' key={i._id} onClick={() => sendTrack(i._id)}>
                        {i.public === false && user.role !== 'admin' ? null :
                            <>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{flex: '1 0 auto'}}>
                                        <Typography component="div" variant="h6">
                                            Title: {i.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Number: {i.number}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Duration: {i.duration}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {i.public === false ? 'Not Publish' : 'Publish'}
                                        </Typography>
                                        {user?.role === 'admin' &&
                                            <Button onClick={() => dispatch(publishTrack(i._id))}>Make Public</Button>
                                        }
                                    </CardContent>
                                </Box>
                                {user?.role === 'admin' &&
                                    <Button onClick={() => dispatch(deleteTrack(i._id))}>Delete</Button>
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

export default Tracks;