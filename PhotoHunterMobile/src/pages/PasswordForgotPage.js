import {useState} from "react";
import axios from "axios";
import React from "react";
import {StyleSheet, Button, Text, TextInput, View} from "react-native";
import Styles from "../Styles";

export default function PasswordForgotPage() {
    const [email, setEmail] = useState()
    const [done, setDone] = useState(false)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const classes = Styles()

    const handleResetEmail = () => {

        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            setError("Email not valid")
            return
        } else {
            setError()
        }

        setLoading(true)
        axios.post("https://photohunter.herokuapp.com/user/sendpasswordreset", {"email": email})
            .then((response) => response.data)
            .then(() => setDone(true))
            .catch(console.error)
            .finally(() => {
                setLoading(false)
            })
    }

    if (done) {
        return (<View style={classes.card}>
                <Text style={classes.page_title}>
                    Email send
                </Text>
            </View>
        )
    }

    return (
        <View style={classes.card}>
            <Text style={classes.page_title}>
                Send Password Reset Email
            </Text>
            <View style={classes.content}>
                {error && <Text style={classes.error}>{error}</Text>}
                <TextInput style={[classes.input, classes.shadow]}
                           value={email}
                           onChangeText={setEmail}
                           placeholder={"Email"}/>
                <Button
                    disabled={loading}
                    title={"Send"}
                    onPress={handleResetEmail}>
                </Button>
                {loading && <View/>}
            </View>
        </View>
    )
}
