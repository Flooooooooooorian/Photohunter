import {Card, makeStyles, Typography} from "@material-ui/core";


export default function PasswordRedirectPage() {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <Typography variant={"h4"}>
                Password has been reset!
            </Typography>
        </Card>
    )
}

const useStyles = makeStyles(
    {
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "25px",
        },
    }
)
