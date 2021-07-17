import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import React from "react";
import {Route, Redirect} from "react-router-native"

export default function PrivateRoute(props) {
    const {token} = useContext(AuthContext)

    return (
        token ? <Route {...props }/> : <Redirect to={'/login'}/>
    )
}
