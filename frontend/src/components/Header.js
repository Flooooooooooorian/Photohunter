import {AppBar, Toolbar} from "@material-ui/core";

export default function Header() {

    return (
        <AppBar position={"static"}>
            <Toolbar>
                <p>
                    PhotoHunter
                </p>
            </Toolbar>
        </AppBar>
    )
}