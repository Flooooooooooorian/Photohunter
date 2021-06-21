import {useEffect, useState} from "react";
import {Box, Card, CardContent, CardHeader, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import axios from "axios";


export default function LocationDetailsPage({loc}) {
    const [location, setLocation] = useState(loc)
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

    if (location) {
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={location.thumbnail.url}/>
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
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

const useStyles = makeStyles(
    {
        card: {
            margin: 10,
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