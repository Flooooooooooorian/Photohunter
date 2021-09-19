import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {Box, Card, makeStyles, Typography} from "@material-ui/core";
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
    }, [token])

    return (
        <Box className={classes.content}>
            <Typography className={classes.title} variant={"h3"}>
                Admin Page
            </Typography>
            {
                categories.map((categorie) => <AdminCategorieItem categorie={categorie}/>)

            }
        </Box>
    )
};

const useStyles = makeStyles(
    {
        title: {
            textAlign: "center",
        },
    })
