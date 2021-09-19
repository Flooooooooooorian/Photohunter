import {Card, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {createMuiTheme} from "@material-ui/core/styles";

export default function AdminCategorieItem({categorie}) {
    const classes = useStyles()
    const history = useHistory()

    const handleOnClick = () => {
        console.log(categorie)
        history.push("/admin/" + categorie)
    }


    return (
        <Card className={classes.box} onClick={handleOnClick}>
            <Typography className={classes.categorie} variant={"h5"}>
                {categorie}
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
