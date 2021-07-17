import {useHistory} from "react-router-dom";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";

export default function Header() {
    const history = useHistory()

    const handleAvatarOnClick = () => {
        history.push("/profile")
    }

    const handleLogoClick = () => {
        history.push("/locations")
    }

    return (
        <SafeAreaView>
            <View position={"static"} style={classes.appbar}>
                <Text style={classes.heading} onPress={handleLogoClick}>
                    PhotoHunter
                </Text>
                <View style={classes.avatar} onPress={handleAvatarOnClick}>
                </View>
            </View>
        </SafeAreaView>
    )
}

const classes = StyleSheet.create(
    {
        appbar: {
            backgroundColor: "#222",
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between"
        },
        avatar: {
            width: 30,
            height: 30,
        },
        heading: {
            fontSize: 50,
            color: "white",
        },
    }
)
