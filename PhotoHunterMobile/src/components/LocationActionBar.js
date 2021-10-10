import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import Styles from "../Styles";
import LocationActionBarIcon from "./LocationActionBarIcon";

export default function LocationActionBar({toggleView, icon}) {
    const classes = Styles()

    return (
        <ActionBar>
            <TouchableOpacity onPress={toggleView}>
                <LocationActionBarIcon icon={icon}/>
            </TouchableOpacity>
            <Text style={classes.page_title}>Locations</Text>
            <View style={classes.space} />
        </ActionBar>
    )
}

const ActionBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
