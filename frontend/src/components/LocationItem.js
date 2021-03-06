import {Box, Card, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';

export default function LocationItem({location, showDetailsPage}) {
    const classes = useStyles()

    const handleListItemClick = () => {
        showDetailsPage(location)
    }

    return (
        <div>
            <Card className={classes.card} onClick={handleListItemClick}>
                <CardContent className={classes.content}>
                    <CardMedia className={classes.media} image={location.thumbnail ? location.thumbnail.url : "https://picsum.photos/300/200"}/>
                    <Typography className={classes.title} component={"h6"} variant={"h6"}>
                        {location.title}
                    </Typography>
                    <Box className={classes.box}>
                        <Typography component={"h5"} variant={"h5"}>
                            {location.rating}
                        </Typography>
                        <StarIcon/>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

const useStyles = makeStyles(
    {
        card: {
            margin: "15px 25px",
        },
        media: {
            width: 80,
            height: 50,
            marginRight: 10,
        },
        content: {
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            padding: 5,
            "&:last-child": {
                paddingBottom: 5
            },
        },
        box: {
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: 10,
            alignItems: "center",
        },
        title: {
            lineHeight: 2,
        }
    }
)
