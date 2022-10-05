import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";

const ArtistForm = ({onSubmit, error}) => {
  const [state, setState] = useState({
    name: "",
    description: "",
    image: "",
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setState(prevState => ({...prevState, [name]: file}));
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
        <FormElement
          label="Name"
          onChange={inputChangeHandler}
          value={state.name}
          name="name"
          error={getFieldError('name')}
          helperText={error}
        />

        <FormElement
          label="Description"
          onChange={inputChangeHandler}
          value={state.description}
          name="description"
          error={getFieldError('description')}
        />

        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileChangeHandler}
          />
        </Grid>

        <Grid item>
          <Button type="submit" color="primary" variant="contained">Create</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;