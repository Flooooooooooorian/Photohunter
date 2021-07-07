import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Card, makeStyles, Typography} from "@material-ui/core";

export default function ProfilePage() {

    const context = useContext(AuthContext)
    const classes = useStyles()

    return(
        <Card className={classes.card}>
            <Typography className={classes.title} variant={"h3"}>
                Profile
            </Typography>
            <Typography className={classes.title} variant={"h5"}>
                {context.jwtDecoded.name}
            </Typography>
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
