import LocationItem from "./LocationItem";
import React from "react";
import {StyleSheet, Button, Text, View} from "react-native";

export default function LocationList({locations, toggleView, showDetailsPage}) {
    return (
        <>
            <View style={classes.box}>
                <View style={classes.space}/>
                <Text style={classes.title} variant={"h3"}>
                    Locations
                </Text>
                <Button title={""} style={classes.icon} onClick={toggleView} aria-label="map" variant="outlined">
                    <View/>
                </Button>
            </View>
            {locations.map((location) => <LocationItem key={location.id} showDetailsPage={showDetailsPage} location={location}/>)}
        </>
    )
}

const classes = StyleSheet.create(
    {
        title: {
            textAlign: "center",
        },
        icon: {
            //justiFySelf: "end",
        },
        box: {
            marginVertical: 0,
            marginHorizontal: 10,
            display: "flex",
            justifyContent: "space-between",
        },
        space:{
            width: 48,
        }
    }
)
