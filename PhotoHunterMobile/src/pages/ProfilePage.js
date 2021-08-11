import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import LocationsPage from "./LocationsPage";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function ProfilePage() {

    const context = useContext(AuthContext)

    return(
        <View style={classes.card}>
            <Text style={classes.title} variant={"h3"}>
                Profile
            </Text>
            <Text style={classes.title} variant={"h5"}>
                {context.jwtDecoded.name}
            </Text>
            <LocationsPage/>
        </View>
    )
}

const classes = StyleSheet.create(
    {
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 25,
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
            marginTop: 10,
        }
    }
)
