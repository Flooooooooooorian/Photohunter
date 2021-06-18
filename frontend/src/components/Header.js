import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";

export default function Header() {
    const classes = useStyles()

    return (
        <AppBar position={"static"} className={classes.appbar} >
            <Toolbar>
                <Typography component={"h3"} variant={"h3"}>
                    PhotoHunter
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles(
    {
        appbar: {
            background: "#222",
        },
    }
)
