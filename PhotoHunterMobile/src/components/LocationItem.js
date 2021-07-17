import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function LocationItem({location, showDetailsPage}) {

    const handleListItemClick = () => {
        showDetailsPage(location)
    }

    return (
        <View className={classes.card} onClick={handleListItemClick}>
            <View className={classes.content}>
                <View className={classes.media}
                           image={location.thumbnail ? location.thumbnail.url : "https://picsum.photos/300/200"}/>
                <Text className={classes.title} component={"h6"} variant={"h6"}>
                    {location.title}
                </Text>
                <View className={classes.box}>
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
            margin: "15px 25px",
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
