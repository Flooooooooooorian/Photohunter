import {AppBar, Avatar, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

export default function Header() {
    const classes = useStyles()
    const history = useHistory()
    const {authorities} = useContext(AuthContext)

    const handleAvatarOnClick = () => {
        history.push("/profile")
    }

    const handleLogoClick = () => {
        history.push("/locations")
    }

    const handleAdmin = () => {
        history.push("/admin")
    }

    return (
        <AppBar position={"static"} className={classes.appbar} >
            <Toolbar className={classes.toolbar}>
                <Typography component={"h5"} variant={"h5"} onClick={handleLogoClick}>
                    PhotoHunter
                </Typography>
                {
                    authorities.includes("Staff") && <Typography onClick={handleAdmin}>
                        Admin
                    </Typography>
                }
                <Avatar className={classes.avatar} onClick={handleAvatarOnClick}>
                </Avatar>
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles(
    {
        appbar: {
            background: "#222",
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-between"
        },
        avatar: {
            width: 30,
            height: 30,
        }
    }
)
