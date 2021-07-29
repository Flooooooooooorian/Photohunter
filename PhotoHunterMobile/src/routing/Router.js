import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Platform} from "react-native";
import {NativeRouter} from "react-router-native";

export default function Router({children}) {

    console.log(Platform.OS);
    return (
        Platform.select({
            ios: (
                <NativeRouter>
                    {children}
                </NativeRouter>
            ),
            android: (
                <NativeRouter>
                    {children}
                </NativeRouter>
            ),
            native: (
                <NativeRouter>
                    {children}
                </NativeRouter>
            ),
            web: (
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            ),
            default: (
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            ),
        })
    )
}
