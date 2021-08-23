import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {Image, Platform, Text, View} from "react-native";
import React from "react";
import Styles from "../Styles";
import AdMobBanner from "expo-ads-admob/build/AdMobBanner.web";

export default function LocationDetailsPage() {
    const historyState = useLocation();
    const [location, setLocation] = useState(historyState.state?.loc)
    const {id} = useParams()
    const classes = Styles()

    const AdmobBanner = Platform.select(
        {
            ios: () => {
                return <AdMobBanner
                    bannerSize="largeBanner"
                    adUnitID="ca-app-pub-1201256601321447/3572724672"
                    servePersonalizedAds={false}/>
            },
            android: () => {
                return <AdMobBanner
                    bannerSize="largeBanner"
                    adUnitID="ca-app-pub-1201256601321447/9246927022"
                    servePersonalizedAds={false}/>
            }
        })();

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
        <>
            <View style={{...classes.card, ...classes.shadow}}>
                <Image
                    style={classes.media}
                    source={{
                        uri: location.thumbnail ? location.thumbnail.url : "https://picsum.photos/300/200",
                    }}
                />
                <View>
                    <Text style={classes.text_title}>
                        {location.title}
                    </Text>
                    <Text>
                        {location.rating}
                    </Text>
                    <Text>
                        {"Tags"}
                    </Text>
                    <Text display={"block"}>
                        {location.description}
                    </Text>
                </View>
            </View>
            <AdmobBanner/>
        </>
    )
}
