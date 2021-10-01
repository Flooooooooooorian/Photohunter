import useLocations from "../hooks/useLocations";
import LocationList from "../components/LocationList";
import {useState} from "react";
import LocationMap from "../components/LocationMap";
import {useHistory} from "react-router-dom";
import {Box, createTheme, makeStyles} from "@material-ui/core";

export default function LocationsPage({geoLocation}) {

    const [mapIsEnabled, setMapIsEnabled] = useState(false)
    const locations = useLocations(geoLocation)
    const history = useHistory()
    const classes = useStyles()

    const toggleView = () => {
        setMapIsEnabled(!mapIsEnabled)
    }

    const showDetailsPage = (location) => {
        history.push({
            pathname: "/locations/" + location.id,
            state: {loc: location}
        })
    }

    const showCreateLocationPage = (event) => {
        history.push(`/locations/new/?lat=${event.latLng.lat()}&lng=${event.latLng.lng()}`)
    }

    return (
        <Box className={classes.box}>
            {mapIsEnabled ?
                <LocationMap showCreateLocationPage={showCreateLocationPage} showDetailsPage={showDetailsPage}
                             locations={locations} toggleView={toggleView} geoLocation={geoLocation}/> :
                <LocationList showDetailsPage={showDetailsPage} locations={locations} toggleView={toggleView}
                              geoLocation={geoLocation}/>}
        </Box>
    );
}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const useStyles = makeStyles(
    {
        box: {
            [theme.breakpoints.down('sm')]: {
                margin: 25,
            },
            [theme.breakpoints.up('sm')]: {
                margin: "10px 20%",
            },
        },
        title: {
            textAlign: "center",
        },
    }
)

