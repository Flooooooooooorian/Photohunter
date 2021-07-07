import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardContent, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import google_logo from "../resources/btn_google_light_normal_ios.svg"
import AuthContext from "../context/AuthContext";

export default function LoginPage() {

    const [config, setConfig] = useState();
    const [error, setError] = useState()
    const {login} = useContext(AuthContext)
    const history = useHistory();
    const classes = useStyles()
    const parameter = {
        scope: "https%3A//www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        access_type: "offline",
        response_type: "code",
        state: "state_parameter_passthrough_value",
    }

    useEffect(() => {
        axios.get("/auth/google/login/config")
            .then(response => response.data)
            .then(setConfig)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        login({email: event.target[0].value, password: event.target[2].value})
            .catch((error) => {
                setError(error.response.data.message)
            })
    }

    const handleRegistrationClick = () => {
        history.push("/registration")
    }

    const handleGoogleLoginClick = () => {
        window.open(`https://accounts.google.com/o/oauth2/v2/auth?scope=${parameter.scope}&access_typ=${parameter.access_type}&response_type=${parameter.response_type}&state=${parameter.state}&redirect_uri=${config.redirectUri}&client_id=${config.clientId}`, "_self")
    }

    return (
        <Card className={classes.card}>
            <Typography className={classes.title} variant={"h3"}>
                Login
            </Typography>
            {error && <Typography className={classes.error}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <CardContent className={classes.content}>
                    <TextField className={classes.item} size={"small"} required variant={"outlined"}
                               label={"Email"}/>
                    <TextField type={"password"} className={classes.item} size={"small"} required
                               variant={"outlined"}
                               label={"Password"}/>
                    <Button type={"submit"} className={classes.item} variant={"contained"} color="primary">
                        Sign In
                    </Button>
                </CardContent>
            </form>
            <Typography className={classes.forgot} variant={"caption"} onClick={() => {
                history.push("/forgot")
            }}>
                Forgot your Password?
            </Typography>
            <Button className={classes.item} variant={"contained"} color="primary"
                    onClick={handleRegistrationClick}>
                Registration
            </Button>

            {config &&
            <Card className={classes.google} onClick={handleGoogleLoginClick}>
                <img src={google_logo} alt={"G"}/>
                <Typography>
                    Sign in with Google
                </Typography>
            </Card>
            }
        </Card>
    )
};

const useStyles = makeStyles(
    {
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "25px",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        item: {
            margin: 10,
        },
        media: {
            width: 50,
            paddingTop: "56.25%" //16:9
        },
        google: {
            display: "flex",
            alignItems: "center",
            marginBottom: 25,
        },
        title: {
            textAlign: "center",
        },
        forgot: {
            textDecoration: 'underline',
        },
        error: {
            color: "red",
            marginTop: "10px",
        },
    }
)
