import React from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";


export default function FormTextInput(props) {

    return (
        <View style={classes.container}>
            <Text style={classes.titleText}>
                {props.titleText}
            </Text>
            <TextInput style={classes.input} {...props}>

            </TextInput>
            <Text style={classes.errorText}>
                {props.errorText}
            </Text>
        </View>
    )
}

const classes = StyleSheet.create(
    {
        container: {
            margin: 10,
        },
        input: {
            padding: 10,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        titleText: {
            fontWeight: "bold",
        },
        errorText: {
            color: "red",
        }
    }
)
