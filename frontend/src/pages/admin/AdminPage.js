import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core/styles";
import AdminCategorieItem from "./AdminCategorieItem";

export default function AdminPage() {

    const [categories, setCategories] = useState([])
    let history = useHistory();
    const {token} = useContext(AuthContext)
    const classes = useStyles()

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": token,
            },
        }
        axios.get("/api/admin/", config)
            .then((response) => response.data)
            .then(setCategories)
            .catch((error) => {
                console.error(error)
                history.push({
                    pathname: '/login',
                    state: {nextPathname: '/admin'}
                })
            })
    }, [token, history])

    return (
        <Box className={classes.box}>
            <Typography className={classes.title} variant={"h3"}>
                Admin Page
            </Typography>
            {
                categories.map((categorie) => <AdminCategorieItem key={categorie} categorie={categorie}/>)
            }
        </Box>
    )
};

const theme = createMuiTheme({
    palette: {
        mode: 'dark',
    },
});

const useStyles = makeStyles(
    {
        box: {
            [theme.breakpoints.down('sm')]: {
                margin: 25,
            },
            [theme.breakpoints.up('sm')]: {
                margin: "10px 20%",
            },
        },
        title: {
            textAlign: "center",
        },
    })
