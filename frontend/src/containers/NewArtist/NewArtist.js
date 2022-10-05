import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {createArtist} from "../../store/actions/artistsActions";

const NewArtist = ({history}) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.artistsCombine.createArtistError);

  const onProductFormSubmit = async artistsData => {
    await dispatch(createArtist(artistsData));
    history.push("/");
  };

  return (
    <>
      <Typography
        textAlign="center"
        marginBottom="20px"
        variant="h4"
      >
        New Artist
      </Typography>
      <ArtistForm
        error={error}
        onSubmit={onProductFormSubmit}
      />
    </>
  );
};

export default NewArtist;