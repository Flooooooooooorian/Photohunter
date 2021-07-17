import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function LocationItem({location, showDetailsPage}) {

    const handleListItemClick = () => {
        showDetailsPage(location)
    }

    return (
        <View style={classes.card} onClick={handleListItemClick}>
            <View style={classes.content}>
                <View style={classes.media}
                           image={location.thumbnail ? location.thumbnail.url : "https://picsum.photos/300/200"}/>
                <Text style={classes.title} component={"h6"} variant={"h6"}>
                    {location.title}
                </Text>
                <View style={classes.box}>
                    <Text component={"h5"} variant={"h5"}>
                        {location.rating}
                    </Text>
                    <View/>
                </View>
            </View>
        </View>
    )
}

const classes = StyleSheet.create(
    {
        card: {
            marginVertical: 15,
            marginHorizontal: 25,
        },
        media: {
            width: 80,
            height: 50,
            marginRight: 10,
        },
        content: {
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            padding: 5,
            // "&:last-child": {
            //     paddingBottom: 5
            // },
        },
        box: {
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: 10,
            alignItems: "center",
        },
        title: {
            lineHeight: 2,
        }
    }
)
