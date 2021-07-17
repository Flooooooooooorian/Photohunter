import React from "react";
import GoogleMapsContainer from "./GoogleMapsContainer";
import {StyleSheet, Button, Text, View} from "react-native";

export default function LocationMap({locations, toggleView, geoLocation, showDetailsPage, showCreateLocationPage}) {
    return (
        <>
            <View className={classes.box}>
                <View className={classes.space}/>
                <Text className={classes.title} variant={"h3"}>
                    Locations
                </Text>
                <Button onClick={toggleView} aria-label="list" variant="outlined">
                    <View/>
                </Button>
            </View>
            <GoogleMapsContainer handleMapClick={showCreateLocationPage} handleMarkerClick={showDetailsPage} locations={locations} geoLocation={geoLocation} styles={{}}/>
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

