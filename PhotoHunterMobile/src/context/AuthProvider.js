import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";
import React from "react";

export default function AuthProvider({children}) {

    const [token, setToken] = useState()
    const history = useHistory()
    const [jwtDecoded, setJwtDecoded] = useState()

    const login = credentials => {
        return axios
            .post('https://photohunter.herokuapp.com/user/login', credentials)
            .then(response => response.data)
            .then(data => {
                setToken(data)
                setJwtDecoded(jwt_decode(data.toString()))
            })
            .then(() => history.push('/profile'))
    }

    const loginWithGoogleCode = code =>
        axios.post("https://photohunter.herokuapp.com/auth/google/login", {code})
            .then(response => response.data)
            .then(data => {
                setToken(data)
                setJwtDecoded(jwt_decode(data.toString()))
            })
            .then(() => history.push('/profile'))
            .catch(error => console.error(error.message))


    return (
        <AuthContext.Provider value={{token, login, loginWithGoogleCode, jwtDecoded}}>
            {children}
        </AuthContext.Provider>
    )
}
