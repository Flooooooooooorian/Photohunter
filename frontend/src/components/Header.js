import {AppBar, Box, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export default function Header() {
    const classes = useStyles()
    const history = useHistory()

    const handleHomeClick = () => {
        history.push("/")
    }

    return (
        <AppBar position={"static"} className={classes.appbar} >
            <Toolbar>
                <Box onClick={handleHomeClick}>
                    <Typography component={"h3"} variant={"h3"}>
                        PhotoHunter
                    </Typography>
                </Box>
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
