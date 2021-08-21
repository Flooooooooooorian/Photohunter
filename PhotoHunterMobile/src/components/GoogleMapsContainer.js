import MapView from 'react-native-maps';
import React, {useState} from "react";
import LocationMarker from "./LocationMarker";
import GeoLocationMarker from "./GeoLocationMarker";
import {Dimensions, StyleSheet} from "react-native";

export default function GoogleMapsContainer({
                                                locations,
                                                geoLocation,
                                                handleMarkerClick,
                                                handleMapClick,
                                                styles
                                            }) {

    const [region, setRegion] = useState({
        latitude: geoLocation ? geoLocation.latitude : 51.163361,
        longitude: geoLocation ? geoLocation.longitude : 10.447683,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const style = StyleSheet.create({
        map: {
            marginHorizontal: 20,
            width: Dimensions.get('window').width -40,
            height: Dimensions.get('window').height -250,
            ...styles,
        },
    });

    const onRegionChange = (region) => {
        setRegion(region);
    }

    return (
        <MapView style={style.map}
                 showsUserLocation={true}
                 onPress={handleMapClick}
                 zoom={9}
                 initialRegion={region}
                 onRegionChange={onRegionChange}>

            {geoLocation && <GeoLocationMarker geoLocation={geoLocation}/>}
            {locations.map((location) =>
                <LocationMarker handleMarkerClick={handleMarkerClick} key={location.id} location={location}/>
            )
            }
        </MapView>
    )
}
