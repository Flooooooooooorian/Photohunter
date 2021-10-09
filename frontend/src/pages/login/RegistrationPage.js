import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    createTheme,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import styled from "styled-components/macro";
import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";


export default function RegistrationPage() {

    const [serverError, setServerError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [emailError, setEmailError] = useState()
    const [loading, setLoading] = useState()
    const classes = useStyles();
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (validatePasswords(event.target[4].value, event.target[6].value) && validateEmail(event.target[0].value)) {
            setLoading(true)
            const credentials = {
                "email": event.target[0].value,
                "name": event.target[2].value,
                "password": event.target[4].value
            }
            axios.post("https://photohunter.herokuapp.com/user/register", credentials)
                .then((response) => response.data)
                .then((data) => {
                    setServerError()
                    return data
                })
                .then((data) => {
                    history.push("https://photohunter.herokuapp.com/registration/done")
                    return data
                })
                .catch((error) => {
                    if (error.response?.data?.message !== undefined) {
                        setServerError(error.response.data.message)
                    }
                    console.error(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const validateEmail = (email) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            setEmailError("Email not valid")
            return false
        }
        setEmailError()
        return true
    }

    const validatePasswords = (password1, password2) => {
        if (password1.length < 8) {
            setPasswordError("Password too short")
            return false
        }
        if (password1.length > 128) {
            setPasswordError("Password too long")
            return false
        }
        if (!/[a-z]/.test(password1)) {
            setPasswordError("lowercase letter required")
            return false
        }
        if (!/[A-Z]/.test(password1)){
            setPasswordError("uppercase letter required")
            return false
        }
        if (!/\d/.test(password1)) {
            setPasswordError("number required")
            return false
        }
        if (!/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password1)) {
            setPasswordError("special character required")
            return false
        }
        if (password1 !== password2) {
            setPasswordError("Passwords do not match")
            return false
        }

        setPasswordError()
        return true
    }

    return (
        <>
            <Card className={classes.card}>
                <Title>
                    <Typography className={classes.title} variant={"h3"}>
                        Registration
                    </Typography>
                </Title>
                {serverError && <Typography className={classes.error}>{serverError}</Typography>}
                <form onSubmit={handleSubmit}>
                    <CardContent className={classes.content}>
                        <TextField className={classes.item} error={emailError !== undefined} helperText={emailError}
                                   size={"small"} required variant={"outlined"}
                                   label={"Email"}/>
                        <TextField className={classes.item} size={"small"} required variant={"outlined"}
                                   label={"Name"}/>
                        <TextField type={"password"} className={classes.item} error={passwordError !== undefined}
                                   helperText={passwordError} size={"small"} required variant={"outlined"}
                                   label={"Password"}/>
                        <TextField type={"password"} className={classes.item} error={passwordError !== undefined} size={"small"} required
                                   variant={"outlined"}
                                   label={"Password"}/>

                        <Button disabled={loading} type={"submit"} className={classes.item} variant={"contained"} color="primary">
                            Sign Up
                        </Button>
                    </CardContent>
                </form>
                {loading && <CircularProgress />}
            </Card>
        </>
    )

}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});


const Title = styled.div`
    margin-top: 10px
`

const useStyles = makeStyles(
    {
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "25px",
            [theme.breakpoints.down('sm')]: {
                margin: 25,
            },
            [theme.breakpoints.up('sm')]: {
                margin: "10px 20%",
            },
        },
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        item: {
            margin: 10,
        },
        title: {
            textAlign: "center",
        },
        error: {
            color: "red",
            marginTop: "10px",
        }
    }
)
