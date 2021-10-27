import {Card, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export default function AdminCategorieItem({categorie}) {
    const classes = useStyles()
    const history = useHistory()

    const handleOnClick = () => {
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

const useStyles = makeStyles(
    {
        box: {
            margin: 5,
        },
        categorie: {
            margin: 5,
            textAlign: "center",
        },
        title: {
            textAlign: "center",
        },
    }
)
