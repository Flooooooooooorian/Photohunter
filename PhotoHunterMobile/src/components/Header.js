import {useHistory} from "react-router-dom";
import {StyleSheet, Text, View} from "react-native";
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
        <View position={"static"} className={classes.appbar} >
            <View className={classes.toolbar}>
                <Text component={"h5"} variant={"h5"} onClick={handleLogoClick}>
                    PhotoHunter
                </Text>
                <View className={classes.avatar} onClick={handleAvatarOnClick}>
                </View>
            </View>
        </View>
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
        }
    }
)
