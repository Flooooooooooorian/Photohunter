import {Box, IconButton, makeStyles, Typography} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import GoogleMapsContainer from "./GoogleMapsContainer";

export default function LocationMap({locations, toggleView, geoLocation, showDetailsPage, showCreateLocationPage}) {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.box}>
                <Box className={classes.space}/>
                <Typography className={classes.title} variant={"h3"}>
                    Locations
                </Typography>
                <IconButton onClick={toggleView} aria-label="list" variant="outlined">
                    <ListIcon/>
                </IconButton>
            </Box>
            <GoogleMapsContainer handleMapClick={showCreateLocationPage} handleMarkerClick={showDetailsPage} locations={locations} geoLocation={geoLocation} styles={{}}/>
        </>
    )

}

const useStyles = makeStyles(
    {
        title: {
            textAlign: "center",
        },
        icon: {
            justifySelf: "end",
        },
        box: {
            margin: "0px 10px",
            display: "flex",
            justifyContent: "space-between",
        },
        space:{
            width: 48,
        }
    }
)

