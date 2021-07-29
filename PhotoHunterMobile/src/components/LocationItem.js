import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Styles from "../Styles";

export default function LocationItem({location, showDetailsPage}) {
    const classes = Styles()
    const handleListItemClick = () => {
        showDetailsPage(location)
    }

    return (
        <TouchableOpacity key={location.id} style={{...classes.list_item, ...classes.shadow}} onPress={handleListItemClick}>
            <Image style={classes.list_media}
                   source={{
                       uri: location.thumbnail ? location.thumbnail.url : "https://picsum.photos/300/200",
                   }}
            />
            <Text style={classes.text_title}>
                {location.title}
            </Text>
            <View style={classes.box}>
                <Text>
                    {location.rating}
                </Text>
                <View/>
            </View>
        </TouchableOpacity>
    )
}
