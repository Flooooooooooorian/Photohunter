import {useHistory, useLocation} from "react-router-dom";
import styled from 'styled-components/macro'
import {Button, Card, CardContent, CardMedia, makeStyles, TextField} from "@material-ui/core";
import {useRef} from "react";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function CreateLocationPage() {

    const inputRef = useRef()
    let query = useQuery();
    const history = useHistory()
    const classes = useStyles()

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
            description: event.target[3].value,
            lat: query.get("lat"),
            lng: query.get("lng")
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
        }
    }
)
