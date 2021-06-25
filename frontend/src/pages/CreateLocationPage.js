import {useLocation} from "react-router-dom";
import styled from 'styled-components/macro'
import {Button, Card, CardContent, CardMedia, TextField} from "@material-ui/core";
import {useRef} from "react";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function CreateLocationPage() {

    const inputRef = useRef()
    let query = useQuery();

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
            lng:  query.get("lng")
        }

        formData.append('locationCreationDto', new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));

        axios.post("/api/location", formData, config)
            .then((response) => response.data)
            .then(console.log)
            .catch(console.error)
    }

    return(
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardContent>
                        <TextField required variant={"outlined"} label={"title"}/>
                        {/*<CardMedia image={inputRef.current?.files[0] ? inputRef.current?.files[0] : ""}/>*/}
                        <input type="file" ref={inputRef} />
                        <TextField required multiline variant={"outlined"} label={"description"}/>
                    </CardContent>
                    <Button variant={"contained"} color={"primary"} type={"submit"}>
                        Save
                    </Button>
                </Card>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`
