import React from "react";
import {StyleSheet, Text, View} from "react-native";


export default function RegistrationRedirectPage() {
    return (
        <View className={classes.card}>
            <Text variant={"h4"}>
                Email Verification has been send!
            </Text>
        </View>
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
    }
)
