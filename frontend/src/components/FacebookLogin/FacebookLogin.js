import React from 'react';
import FacebookLoginButton from 'react-facebook-login';
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
        >
            Enter with Facebook
        </FacebookLoginButton>
    );
};

export default FacebookLogin;