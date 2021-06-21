import {Box, Card, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';

export default function LocationItem({location}) {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <CardMedia className={classes.media} component={"img"} src={location.thumbnail ? location.thumbnail.url : ""}/>
                    <Typography className={classes.title} component={"h5"} variant={"h5"}>
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
            margin: 10,
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
