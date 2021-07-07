import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";
import Header from "./components/Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import LocationDetailsPage from "./pages/LocationDetailsPage";
import {geolocated} from "react-geolocated";
import LoginPage from "./pages/LoginPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";
import AuthProvider from "./context/AuthProvider";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./routing/PrivateRoute";
import CreateLocationPage from "./pages/CreateLocationPage";

function App(props) {

    const darkTheme = createMuiTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider theme={darkTheme}>
                    <Header/>
                    <Switch>
                        <Route path={"/locations"} exact>
                            <LocationsPage geoLocation={props.coords}/>
                    </Route>
                    <Route path={"/locations/new/"}>
                        <CreateLocationPage geoLocation={props.coords}/>
                        </Route>
                        <Route path={"/locations/:id"}>
                            <LocationDetailsPage geoLocation={props.coords}/>
                        </Route>
                        <Route path={"/login"}>
                            <LoginPage/>
                        </Route>
                        <Route path={"/auth/google/redirect"}>
                            <GoogleRedirectPage/>
                        </Route>
                        <PrivateRoute path={"/profile"}>
                            <ProfilePage/>
                        </PrivateRoute>
                    </Switch>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
        watchPosition: true,
    },
    userDecisionTimeout: 5000,
})(App);
