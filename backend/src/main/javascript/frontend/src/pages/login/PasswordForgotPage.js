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
import {useState} from "react";
import axios from "axios";

export default function PasswordForgotPage() {
    const [done, setDone] = useState(false)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const classes = useStyles()

    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target[0].value

        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            setError("Email not valid")
            return
        } else {
            setError()
        }

        setLoading(true)
        axios.post("/user/sendpasswordreset", {"email": email})
            .then((response) => response.data)
            .then(() => setDone(true))
            .catch((error) => console.error)
            .finally(() => {
                setLoading(false)
            })
    }


    if (done) {
        return (<Card className={classes.card}>
                <Typography className={classes.title} variant={"h3"}>
                    Email send
                </Typography>
            </Card>
        )
    }

    return (
        <>
            <Card className={classes.card}>
                <Typography className={classes.title} variant={"h3"}>
                    Send Password Reset Email
                </Typography>
                {error && <Typography className={classes.error}>{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <CardContent className={classes.content}>
                        <TextField className={classes.item} size={"small"} required variant={"outlined"}
                                   label={"Email"}/>
                        <Button disabled={loading} type={"submit"} className={classes.item} variant={"contained"}
                                color="primary">
                            Send
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
