import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Route, useHistory} from "react-router-dom";

export default function PrivateRoute(props) {
    const {token} = useContext(AuthContext)
    const history = useHistory()

    if (!token) {
        history.push({
            pathname: '/login',
            state: { nextPathname: props.path }
        })
        return null;
    }
    else {

        return (
            <Route {...props }/>
        )
    }
}
