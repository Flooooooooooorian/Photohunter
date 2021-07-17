import {useState} from "react";
import axios from "axios";
import React from "react";
import {StyleSheet, Button, Text, TextInput, View} from "react-native";

export default function PasswordForgotPage() {
    const [done, setDone] = useState(false)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target[0].value

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
            .catch((error) => console.error)
            .finally(() => {
                setLoading(false)
            })
    }


    if (done) {
        return (<View style={classes.card}>
                <Text style={classes.title} variant={"h3"}>
                    Email send
                </Text>
            </View>
        )
    }

    return (
        <>
            <View style={classes.card}>
                <Text style={classes.title} variant={"h3"}>
                    Send Password Reset Email
                </Text>
                {error && <Text style={classes.error}>{error}</Text>}
                <form onSubmit={handleSubmit}>
                    <View style={classes.content}>
                        <TextInput style={classes.item} size={"small"} required variant={"outlined"}
                                   label={"Email"}/>
                        <Button disabled={loading} type={"submit"} style={classes.item} variant={"contained"}
                                color="primary">
                            Send
                        </Button>
                    </View>
                </form>
                {loading && <View />}
            </View>
        </>
    )
}

const classes = StyleSheet.create(
    {
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "25px",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        item: {
            margin: 10,
        },
        title: {
            textAlign: "center",
        },
        error: {
            color: "red",
            marginTop: "10px",
        }
    }
)
