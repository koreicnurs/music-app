import React from 'react';
import {useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import './Tracks.css';

const Tracks = () => {
    const loading = useSelector(state => state.tracksCombine.loading);
    const tracks = useSelector(state => state.tracksCombine.tracks);

    return loading ? <Spinner/> : tracks && (
        <>
            <Typography component="div" variant="h4" className='album-title'>
                {tracks[0].album.title}
            </Typography>
            <div className='tracks'>
                {tracks.map(i => (
                    <Card sx={{display: 'flex'}} className='track'>
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
                            </CardContent>
                        </Box>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Tracks;