import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CircularProgress, makeStyles, Typography} from "@material-ui/core";

export default function EmailValidationRedirectPage() {
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(true)
    const {token} = useParams()
    const classes = useStyles()

    useEffect(() => {
        axios.post("/user/email", {"token": token})
            .then((response) => response.data)
            .then((data) => {
                if (data) {
                    setResult(true)
                }
                else {
                    setResult(false)
                }
            })
            .catch(() => {
                setResult(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [token])

    return (
        <Card className={classes.card}>
            {loading && <CircularProgress />}
            {!loading && <Typography variant={"h4"}>
                {result && "Email Verification done"}
                {!result && "Email Verification failed"}
            </Typography>}
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
    }
)
