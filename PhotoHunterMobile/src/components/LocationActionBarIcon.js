import React from "react";
import {Feather, FontAwesome} from "@expo/vector-icons";

export default function LocationActionBarIcon({icon}) {

    return (
        <>
            {
                icon === "map" ? <Feather name="map" size={24} color="black"/> : <></>
            }
            {
                icon === "list" ? <FontAwesome name="list" size={24} color="black"/> : <></>
            }
        </>
    )
}
