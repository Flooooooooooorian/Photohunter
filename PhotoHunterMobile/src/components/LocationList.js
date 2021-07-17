import LocationItem from "./LocationItem";
import React from "react";
import {StyleSheet, Button, Text, View} from "react-native";

export default function LocationList({locations, toggleView, showDetailsPage}) {
    return (
        <>
            <View className={classes.box}>
                <View className={classes.space}/>
                <Text className={classes.title} variant={"h3"}>
                    Locations
                </Text>
                <Button title={""} className={classes.icon} onClick={toggleView} aria-label="map" variant="outlined">
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
            //justifySelf: "end",
        },
        box: {
            margin: "0px 10px",
            display: "flex",
            justifyContent: "space-between",
        },
        space:{
            width: 48,
        }
    }
)
