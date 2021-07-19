import React from "react";
import GoogleMapsContainer from "./GoogleMapsContainer";
import {StyleSheet, Button, Text, View, TouchableOpacity} from "react-native";
import Styles from "../Styles";
import { FontAwesome } from '@expo/vector-icons';

export default function LocationMap({locations, toggleView, geoLocation, showDetailsPage, showCreateLocationPage}) {
    const classes = Styles()

    return (
        <>
            <View style={classes.card}>
                <View style={classes.space}/>
                <Text style={classes.page_title} variant={"h3"}>
                    Locations
                </Text>
                <TouchableOpacity onPress={toggleView}>
                    <FontAwesome name="list" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <GoogleMapsContainer handleMapClick={showCreateLocationPage} handleMarkerClick={showDetailsPage} locations={locations} geoLocation={geoLocation} styles={{}}/>
        </>
    )

}
