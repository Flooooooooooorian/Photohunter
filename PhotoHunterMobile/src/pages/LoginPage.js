import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
//import google_logo from "../assets/btn_google_light_normal_ios.svg"
import AuthContext from "../context/AuthContext";
import React from "react";
import {StyleSheet, Button, Text, TextInput, View} from "react-native";

export default function LoginPage() {

    const [config, setConfig] = useState();
    const [error, setError] = useState()
    const {login} = useContext(AuthContext)
    const history = useHistory();
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
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        login({email: event.target[0].value, password: event.target[2].value})
            .catch((error) => {
                setError(error.response.data.message)
            })
    }

    const handleRegistrationClick = () => {
        history.push("https://photohunter.herokuapp.com/registration")
    }

    const handleGoogleLoginClick = () => {
        window.open(`https://accounts.google.com/o/oauth2/v2/auth?scope=${parameter.scope}&access_typ=${parameter.access_type}&response_type=${parameter.response_type}&state=${parameter.state}&redirect_uri=${config.redirectUri}&client_id=${config.clientId}`, "_self")
    }

    return (
        <View style={classes.card}>
            <Text style={classes.title} variant={"h3"}>
                Login
            </Text>
            {error && <Text style={classes.error}>{error}</Text>}
            <>
                {/*onSubmit={handleSubmit}>*/}
                <View style={classes.content}>
                    <TextInput style={classes.item} size={"small"} required variant={"outlined"}
                               label={"Email"}/>
                    <TextInput type={"password"} style={classes.item} size={"small"} required
                               variant={"outlined"}
                               label={"Password"}/>
                    <Button title={"Sign In"} type={"submit"} style={classes.item} />
                </View>
            </>
            <Text style={classes.forgot}  onPress={() => {
                history.push("/forgot")
            }}>
                Forgot your Password?
            </Text>
            <Button title={"Registration"} style={classes.item} onPress={handleRegistrationClick} />

            {config &&
            <View style={classes.google} onPress={handleGoogleLoginClick}>
                <Text>
                    Sign in with Google
                </Text>
            </View>
            }
        </View>
    )
};

const classes = StyleSheet.create(
    {
        card: {
            margin: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        item: {
            margin: 10,
        },
        media: {
            width: 50,
            paddingTop: "56.25%" //16:9
        },
        google: {
            display: "flex",
            alignItems: "center",
            marginBottom: 25,
        },
        title: {
            textAlign: "center",
        },
        forgot: {
            //textDecoration: 'underline',
        },
        error: {
            color: "red",
            marginTop: "10px",
        },
    }
)
