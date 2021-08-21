import {useHistory, useLocation} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import GoogleMapsContainer from "../components/GoogleMapsContainer";
import AuthContext from "../context/AuthContext";
import React from "react";
import {View, TouchableOpacity, Text, Image, Dimensions, ScrollView} from "react-native";
import Styles from "../Styles";
import FormTextInput from "../components/FormTextInput";
import * as ImagePicker from 'expo-image-picker';
import ServerConfig from "../../ServerConfig";

export default function CreateLocationPage() {

    const historyState = useLocation();
    const history = useHistory()
    const {token} = useContext(AuthContext)

    const [coords, setCoords] = useState(historyState.state?.coords)
    const [photo, setPhoto] = useState()
    const [titleError, setTitleError] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const classes = Styles()

    const handleMapClick = (event) => {
        setCoords({
            longitude: event.nativeEvent.coordinate.longitude,
            latitude: event.nativeEvent.coordinate.latitude
        })
    }

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setPhoto(result);
        }
    };

    const handleSubmit = () => {
        if (title > 11) {
            setTitleError("Title longer than 11 Characters")
            return
        } else {
            setTitleError()
        }

        const formData = new FormData()

        const config = {
            headers: {
                "Authorization": token,
                "Content-Type": "multipart/form-data",
            },
        }

        const data = {
            title: title,
            description: description,
            lat: coords.latitude,
            lng: coords.longitude
        }

        formData.append('locationCreationDto', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));

        if (photo) {
            formData.append("file", photo)
        }

        axios.post(ServerConfig.ip + "/api/location", formData, config)
            .then((response) => response.data)
            .then((data) => {
                history.push({
                    pathname: "/locations/" + data.id,
                    state: {loc: data}
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <ScrollView style={classes.card}>
            <View style={classes.content}>
                <FormTextInput
                    errorText={titleError}
                    placeholder={"Title"}
                    titleText={"Title"}
                    value={title}
                    onChangeText={setTitle}/>

                <FormTextInput
                    placeholder={"Description"}
                    titleText={"Description"}
                    value={description}
                    onChangeText={setDescription}/>

                <View style={{margin: 10}}>
                    {photo && (
                        <Image
                            source={{uri: photo.uri}}
                            style={{width: 300, height: 300}}
                        />
                    )}
                </View>

                <TouchableOpacity style={{...classes.button, marginTop: 10}}
                                  onPress={handleChoosePhoto}>
                    <Text style={{color: '#fff'}}>
                        Select Image
                    </Text>
                </TouchableOpacity>


                <GoogleMapsContainer
                    handleMarkerClick={null}
                    handleMapClick={handleMapClick}
                    locations={[]}
                    geoLocation={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    }}
                    styles={{
                        width: Dimensions.get('window').width - 100,
                        height: Dimensions.get('window').height - 450,
                    }}/>
                <TouchableOpacity style={classes.button}
                                  onPress={handleSubmit}>
                    <Text style={{color: '#fff'}}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
