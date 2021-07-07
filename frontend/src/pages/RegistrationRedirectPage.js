import {Card, makeStyles, Typography} from "@material-ui/core";


export default function RegistrationRedirectPage() {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <Typography variant={"h4"}>
                Email Verification has been send!
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
