import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelectTrack from "../UI/Form/FormSelectTrack/FormSelectTrack";

const TrackForm = ({onSubmit, album, error}) => {

    const [state, setState] = useState({
        album: "",
        number: "",
        title: "",
        duration: ""
    });

    const submitFormHandler = e => {
        e.preventDefault();
        onSubmit({...state});
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >
                <FormSelectTrack
                    label="Album"
                    onChange={inputChangeHandler}
                    value={state.album}
                    name="album"
                    options={album}
                    error={getFieldError('album')}
                />

                <FormElement
                    label="Number"
                    onChange={inputChangeHandler}
                    value={state.number}
                    name="number"
                    error={getFieldError('number')}
                />

                <FormElement
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    error={getFieldError('title')}
                />

                <FormElement
                    label="Duration"
                    onChange={inputChangeHandler}
                    value={state.duration}
                    name="duration"
                    error={getFieldError('duration')}
                />

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TrackForm;