import {useEffect, useState} from "react";
import {Box, Card, CardContent, CardHeader, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {useLocation, useParams} from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import axios from "axios";
import {createMuiTheme} from "@material-ui/core/styles";

export default function LocationDetailsPage() {
    const historyState = useLocation();
    const [location, setLocation] = useState(historyState.state?.loc)
    const {id} = useParams()

    const classes = useStyles()

    useEffect(() => {
        if (!location) {
            axios.get("/api/location/" + id)
                .then((response) => response.data)
                .then(setLocation)
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [id, location, setLocation])

    console.log(location)
    if (!location) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={location.thumbnail ? location.thumbnail.url : "https://picsum.photos/300/200"}/>
            <CardHeader
                title={location.title}
                action={
                    <Box className={classes.box}>
                        <Typography component={"h5"} variant={"h5"}>
                            {location.rating}
                        </Typography>
                        <StarIcon/>
                    </Box>}
                subheader={
                    <Box>
                        <Typography>
                            {"Tags"}
                        </Typography>
                    </Box>
                }>
            </CardHeader>
            <CardContent className={classes.content}>
                <Typography>
                    {location.description}
                </Typography>
            </CardContent>
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
            [theme.breakpoints.down('sm')]: {
                margin: 10,
            },
            [theme.breakpoints.up('sm')]: {
                margin: "10px 20%",
            },
        },
        media: {
            height: 0,
            paddingTop: "56.25%" //16:9
        },
        box: {
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: 10,
            alignItems: "center",
        },
        content: {
            paddingTop: 0,
        }
    }
)
