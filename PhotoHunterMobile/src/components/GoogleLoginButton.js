import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import Styles from "../Styles";
import axios from "axios";


export default function GoogleLoginButton() {
    const classes = Styles()
    const [config, setConfig] = useState();
    const parameter = {
        scope: "https%3A//www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        access_type: "offline",
        response_type: "code",
        state: "state_parameter_passthrough_value",
    }

    useEffect(() => {
        axios.get("https://photohunter.herokuapp.com/auth/google/login/config")
            .then(response => response.data)
            .then(setConfig)
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleGoogleLoginClick = () => {
        window.open(`https://accounts.google.com/o/oauth2/v2/auth?scope=${parameter.scope}&access_typ=${parameter.access_type}&response_type=${parameter.response_type}&state=${parameter.state}&redirect_uri=${config.redirectUri}&client_id=${config.clientId}`, "_self")
    }

    return (
        <View>
            {config &&
            <TouchableOpacity style={{
                ...classes.button,
                ...classes.google,
            }}
                              onPress={handleGoogleLoginClick}>
                <Text style={{color: "#ffffff"}}>
                    Sign in with Google
                </Text>
            </TouchableOpacity>
            }
        </View>
    )
}
