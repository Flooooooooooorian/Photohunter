import {Card, makeStyles, Typography} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";


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

const theme = createMuiTheme({
    palette: {
        mode: 'dark',
    },
});

const useStyles = makeStyles(
    {
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "25px",
            [theme.breakpoints.down('sm')]: {
                margin: 25,
            },
            [theme.breakpoints.up('sm')]: {
                margin: "10px 20%",
            },
        },
    }
)
