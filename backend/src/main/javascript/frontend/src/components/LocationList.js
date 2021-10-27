import LocationItem from "./LocationItem";
import {Box, IconButton, makeStyles, Typography} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";

export default function LocationList({locations, toggleView, showDetailsPage}) {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.box}>
                <Box className={classes.space}/>
                <Typography className={classes.title} variant={"h3"}>
                    Locations
                </Typography>
                <IconButton className={classes.icon} onClick={toggleView} aria-label="map" variant="outlined">
                    <MapIcon/>
                </IconButton>
            </Box>
            {locations.map((location) => <LocationItem key={location.id} showDetailsPage={showDetailsPage} location={location}/>)}
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
