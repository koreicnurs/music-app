import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Button} from "@mui/material";
import {facebookId} from "../../config";


const FacebookLogin = () => {

    const facebookResponse = (resp) => {
        console.log(resp);
    }

    return (
        <FacebookLoginButton
            appId={facebookId}
            fields="name, email, picture"
            callback={facebookResponse}
            render={props => (
                <Button
                    fullWidth
                    color='primary'
                    variant='outlined'
                    startIcon={<FacebookIcon/>}
                    onClick={props.onClick}
                >
                    Enter with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;