import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import {createMuiTheme} from "@material-ui/core/styles";
import {
    Box, Button,
    makeStyles,
    Typography
} from "@material-ui/core";
import {DataGrid} from "@mui/x-data-grid";

export default function AdminUserPage() {

    const [users, setUsers] = useState([])
    const [reload, setReload] = useState(false)
    let history = useHistory();
    const {token} = useContext(AuthContext)
    const classes = useStyles()

    const handleBackButton = () => history.goBack()
    const handleReload = () => {
        setReload(!reload)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'full_name', headerName: 'Full Name', width: 150 },
        { field: 'enabled', headerName: 'Enabled', type: 'boolean', width: 130 },
        { field: 'role', headerName: 'Role', width: 130 },
        { field: 'joinedOn', headerName: 'joined On', width: 130 },
        { field: 'google_access_token', headerName: 'GAT', width: 130 },
        { field: 'google_refresh_token', headerName: 'GRT', width: 130 },
    ];

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
    }, [token, history])

    return(
        <Box className={classes.content}>
            <div className={classes.top}>
                <Button onClick={handleBackButton} variant={"outlined"}>
                    Back
                </Button>
                <Typography className={classes.title} variant={"h3"}>
                    Admin User Page
                </Typography>
                <Button onClick={handleReload} variant={"outlined"}>
                    Reload
                </Button>
            </div>
            <div style={{ height: 800, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection

                />
            </div>
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
        top: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
    }
)
