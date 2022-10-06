import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {getTracksHistory} from "../../store/actions/trackHistoryActions";

const TrackHistory = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.trackHistory.loading);
    const tracks = useSelector(state => state.trackHistory.history);

    useEffect(() => {
        dispatch(getTracksHistory());
    }, [dispatch]);

    return loading ? <Spinner/> : (
        <>
            <div className='histories'>
                {tracks.map(i => (

                    <Card sx={{display: 'flex'}} className='history'>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography component="div" variant="h5">
                                    {i.trackId.title}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>

                ))}

            </div>
        </>
    );
};

export default TrackHistory;