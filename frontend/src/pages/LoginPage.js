import {useEffect, useState} from "react";
import axios from "axios";

export default function LoginPage() {

    const [config, setConfig] = useState();
    const parameter = {
        scope: "https%3A//www.googleapis.com/auth/userinfo.profile",
        access_type: "offline",
        response_type: "code",
        state: "state_parameter_passthrough_value",
    }

    useEffect(() => {
        axios.get("/auth/google/login/config")
            .then(response => response.data)
            .then(setConfig)
    }, [])

    return (
        <>
            {config &&
            <a href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${parameter.scope}&access_typ=${parameter.access_type}&response_type=${parameter.response_type}&state=${parameter.state}&redirect_uri=${config.redirectUri}&client_id=${config.clientId}`}>
                <button>
                    Login
                </button>
            </a>}
        </>
    )
}
