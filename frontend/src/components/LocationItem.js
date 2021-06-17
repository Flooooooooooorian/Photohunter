import {Avatar, Card, CardHeader, makeStyles} from "@material-ui/core";

export default function LocationItem({location}) {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader avatar={
                    <Avatar src={location.thumbnail.url}/>
                } title={location.title}
                  subheader={""}/>
            </Card>
        </div>
    )
}

const useStyles = makeStyles(
    {
        card: {
            margin: 10
        }
    }
)