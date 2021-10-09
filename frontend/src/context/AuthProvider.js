import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";

export default function AuthProvider({children}) {

    const [token, setToken] = useState()
    const [authorities, setAuthorities] = useState([])
    const history = useHistory()
    const [jwtDecoded, setJwtDecoded] = useState()

    const login = credentials => {
        return axios
            .post('/user/login', credentials)
            .then(response => response.data)
            .then(data => {
                setToken(data.jwt)
                setAuthorities(data.authorities)
                setJwtDecoded(jwt_decode(data.jwt.toString()))
            })
    }

    const loginWithGoogleCode = code =>
        axios.post("/auth/google/login", {code})
            .then(response => response.data)
            .then(data => {
                setToken(data.jwt)
                setAuthorities(data.authorities)
                setJwtDecoded(jwt_decode(data.jwt.toString()))
            })
            .then(() => history.push('/profile'))
            .catch(error => console.error(error.message))


    return (
        <AuthContext.Provider value={{token, login, loginWithGoogleCode, jwtDecoded, authorities}}>
            {children}
        </AuthContext.Provider>
    )
}
