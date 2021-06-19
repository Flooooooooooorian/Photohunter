import {useEffect, useState} from "react";
import {Card, CardHeader} from "@material-ui/core";
import {useParams} from "react-router-dom";
import axios from "axios";


export default function LocationDetailsPage({loc}) {
    const [location, setLocation] = useState(loc)
    const {id} = useParams()

    useEffect(() => {
        if (!location) {
            axios.get("/api/location/" + id)
                .then((response) => response.data)
                .then(setLocation)
                .catch((error) => {console.error(error)})
        }
    }, [id, location, setLocation])

    if (location) {
        return (
            <div>
                <Card>
                    <CardHeader title={location.title} subheader={location.description}>

                    </CardHeader>
                </Card>
            </div>
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}
