import {useHistory, useLocation} from "react-router-dom";
import {Box, Button, Card, CardContent, makeStyles, TextField} from "@material-ui/core";
import {useRef, useState} from "react";
import axios from "axios";
import GoogleMapsContainer from "../components/GoogleMapsContainer";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function CreateLocationPage() {

    const inputRef = useRef()
    const mapRef = useRef();
    let query = useQuery();
    const history = useHistory()
    const classes = useStyles()

    const [coords, setCoords] = useState({
        latitude: parseFloat(query.get("lat")),
        longitude: parseFloat(query.get("lng")),
    })

    const onMapLoad = (map) => {
        mapRef.current = map;
    }

    const handleMapClick = (event) => {
        setCoords({longitude: event.latLng.lng(), latitude: event.latLng.lat()})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData()

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const data = {
            title: event.target[0].value,
            description: event.target[2].value,
            lat: coords.latitude,
            lng: coords.longitude
        }

        formData.append('locationCreationDto', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));

        if (inputRef.current.files[0]) {
            formData.append("file", inputRef.current.files[0])
        }

        axios.post("/api/location", formData, config)
            .then((response) => response.data)
            .then((data) => {
                history.push({
                    pathname: "/locations/" + data.id,
                    state: {loc: data}
                })
            })
            .catch(console.error)
    }

    return (
        <Card className={classes.card}>
            <form onSubmit={handleSubmit}>
                <CardContent className={classes.content}>
                    <TextField className={classes.item} size={"small"} required variant={"outlined"} label={"title"}/>
                    <TextField className={classes.item} size={"medium"} required multiline variant={"outlined"}
                               label={"description"}/>
                    {/*<CardMedia image={inputRef.current?.files[0] ? inputRef.current?.files[0] : ""}/>*/}
                    <input className={classes.item} type="file" ref={inputRef}/>
                    <Box className={classes.mapBox}>
                        <GoogleMapsContainer
                            onMapLoad={onMapLoad}
                            handleMarkerClick={null}
                            handleMapClick={handleMapClick}
                            locations={[]}
                            geoLocation={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                            }}
                            styles={{height: "200px"}}/>
                    </Box>
                    <Button className={classes.button} variant={"contained"} color={"primary"} type={"submit"}>
                        Save
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}

const useStyles = makeStyles(
    {
        card: {
            margin: 10,
        },
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            margin: 0,
            padding: 0,
        },
        button: {
            alignSelf: "flex-end",
            marginRight: 10,
        },
        item: {
            margin: 10,
        },
        mapBox: {
            height: 300,
        }
    }
)