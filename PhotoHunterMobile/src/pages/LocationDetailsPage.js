import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";

export default function LocationDetailsPage() {
    const historyState = useLocation();
    const [location, setLocation] = useState(historyState.state?.loc)
    const {id} = useParams()

    const classes = useStyles()

    useEffect(() => {
        if (!location) {
            axios.get("https://photohunter.herokuapp.com/api/location/" + id)
                .then((response) => response.data)
                .then(setLocation)
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [id, location, setLocation])

    if (!location) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <View className={classes.card}>
            <View className={classes.media}
                  image={location.thumbnail ? location.thumbnail.url : "https://picsum.photos/300/200"}/>
            <View
                title={location.title}
                action={
                    <View className={classes.box}>
                        <Text component={"h5"} variant={"h5"}>
                            {location.rating}
                        </Text>
                        <View/>
                    </View>}
                subheader={
                    <View>
                        <Text>
                            {"Tags"}
                        </Text>
                    </View>
                }>
            </View>
            <View className={classes.content}>
                <Text display={"block"}>
                    {location.description}
                </Text>
            </View>
        </View>
    )
}

const useStyles = StyleSheet.create(
    {
        card: {
            margin: 25,
        },
        media: {
            height: 0,
            paddingTop: "56.25%" //16:9
        },
        box: {
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: 10,
            alignItems: "center",
        },
        content: {
            paddingTop: 0,
        }
    }
)
