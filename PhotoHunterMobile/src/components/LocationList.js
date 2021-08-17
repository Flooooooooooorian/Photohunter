import LocationItem from "./LocationItem";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Styles from "../Styles";
import { Feather } from '@expo/vector-icons';

export default function LocationList({locations, toggleView, showDetailsPage}) {
    const classes = Styles()

    return (
        <>
            <View style={classes.card}>
                <View style={classes.space}/>
                <Text style={classes.page_title}>
                    Locations
                </Text>

                <TouchableOpacity onPress={toggleView}>
                    <Feather name="map" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {locations.map((location) => <LocationItem key={location.id} showDetailsPage={showDetailsPage} location={location}/>)}
        </>
    )
}
