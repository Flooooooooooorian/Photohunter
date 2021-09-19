import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import {createMuiTheme} from "@material-ui/core/styles";
import {Box, makeStyles, Typography} from "@material-ui/core";
import AdminUserItem from "./AdminUserItem";

export default function AdminUserPage() {

    const [users, setUsers] = useState([])
    let history = useHistory();
    const {token} = useContext(AuthContext)
    const classes = useStyles()

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": token,
            },
        }
        axios.get("/api/admin/users", config)
            .then((response) => response.data)
            .then(setUsers)
            .catch((error) => {
                console.error(error)
                history.push({
                    pathname: '/login',
                    state: {nextPathname: '/admin/users'}
                })
            })
    }, [token])

    console.log(users)

    return(
        <Box className={classes.content}>
            <Typography className={classes.title} variant={"h3"}>
                Admin User Page
            </Typography>
            {
                users.map((user) => <AdminUserItem key={user.id} user={user}/>)

            }
        </Box>
    )
}

const theme = createMuiTheme({
    palette: {
        mode: 'dark',
    },
});

const useStyles = makeStyles(
    {
        content: {
            [theme.breakpoints.down('sm')]: {
                margin: 25,
            },
            [theme.breakpoints.up('sm')]: {
                margin: "10px 20%",
            },
        },
        categorie: {
            textAlign: "center",
        },
        box: {
            margin: "0px 10px",
            display: "flex",
            justifyContent: "space-between",
        },
        title: {
            textAlign: "center",
        },
    }
)
