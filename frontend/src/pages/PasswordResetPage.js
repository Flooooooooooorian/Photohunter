import {Button, Card, CardContent, CircularProgress, makeStyles, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";
import {useHistory, useLocation, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function PasswordResetPage() {
    const classes = useStyles()
    const [passwordError, setPasswordError] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    let query = useQuery();
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (validatePasswords(event.target[0].value, event.target[2].value)) {
            setLoading(true)
            const credentials = {"email": jwt_decode(query.get("token")).sub, "password": event.target[0].value, "token": query.get("token")}
            axios.post("/user/passwordreset", credentials)
                .then((response) => response.data)
                .then((data) => {
                    if (data) {
                        history.push("/password/done")
                    }
                })
                .catch(() => {
                    setError("Password Reset Failed")
                })
                .finally(() => {
                    setLoading(false)
                })
        }
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
        if (!/[A-Z]/.test(password1)) {
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
        <Card className={classes.card}>
            <Typography className={classes.title} variant={"h3"}>
                Password Reset
            </Typography>
            {error && <Typography className={classes.error}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <CardContent className={classes.content}>
                    <TextField type={"password"}
                               error={passwordError !== undefined}
                               helperText={passwordError}
                               className={classes.item}
                               size={"small"}
                               required
                               variant={"outlined"}
                               label={"Password"}/>
                    <TextField type={"password"}
                               error={passwordError !== undefined}
                               className={classes.item}
                               size={"small"}
                               required
                               variant={"outlined"}
                               label={"Password"}/>
                    <Button
                        type={"submit"}
                        className={classes.item}
                        variant={"contained"}
                        color="primary"
                        disabled={loading}>
                        Reset
                    </Button>
                </CardContent>
            </form>
            {loading && <CircularProgress />}
        </Card>
    )
}

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
        title: {
            textAlign: "center",
        },
        error: {
            color: "red",
            marginTop: "10px",
        }
    }
)
