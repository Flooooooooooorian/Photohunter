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

export default function AdminLocationPage() {

    const [locations, setLocations] = useState([])
    let history = useHistory();
    const {token} = useContext(AuthContext)
    const classes = useStyles()

    const handleBackButton = () => history.goBack()

    const getOwnerMail = (params) => {
        return params.row? params.row.owner.email : params.value
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'title', headerName: 'Title', width: 150},
        {
            field: 'owner', headerName: 'Owner', width: 200,
            valueGetter: getOwnerMail,
            sortComparator: (v1, v2, cellParams1, cellParams2) =>
                getOwnerMail(cellParams1).localeCompare(getOwnerMail(cellParams2)),
        },
        {field: 'description', headerName: 'Description', width: 150},
        {field: 'lat', headerName: 'Latitude', type: 'number', width: 130},
        {field: 'lng', headerName: 'Longitude', type: 'number', width: 150},
        {field: 'rating', headerName: 'Rating', type: 'number', width: 120},
        {field: 'tags', headerName: 'Tags', width: 130},
        {field: 'thumbnail', headerName: 'Thumbnail', width: 130},
    ];

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": token,
            },
        }
        axios.get("/api/admin/locations", config)
            .then((response) => response.data)
            .then(setLocations)
            .catch((error) => {
                console.error(error)
                history.push({
                    pathname: '/login',
                    state: {nextPathname: '/admin/locations'}
                })
            })
    }, [token, history])

    return (
        <Box className={classes.content}>
            <div className={classes.top}>
                <Button onClick={handleBackButton} variant={"outlined"}>
                    Back
                </Button>
                <Typography className={classes.title} variant={"h3"}>
                    Admin Location Page
                </Typography>
                <div/>
            </div>

            <div style={{height: 800, width: '100%'}}>
                <DataGrid
                    rows={locations}
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
