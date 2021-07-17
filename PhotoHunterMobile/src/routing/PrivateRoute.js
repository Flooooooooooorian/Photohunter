import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import React from "react";

export default function PrivateRoute(props) {
    const {token} = useContext(AuthContext)

    return (
        token ? <Route {...props }/> : <Redirect to={'/login'}/>
    )
}