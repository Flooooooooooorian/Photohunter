import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Card, makeStyles, Typography} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";
import LocationsPage from "./LocationsPage";

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
            <LocationsPage/>
        </Card>
    )
}

const theme = createMuiTheme({
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
