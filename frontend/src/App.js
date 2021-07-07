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
import RegistrationPage from "./pages/RegistrationPage";
import RegistrationRedirectPage from "./pages/RegistrationRedirectPage";
import PasswordForgotPage from "./pages/PasswordForgotPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import EmailValidationRedirectPage from "./pages/EmailValidationRedirectPage";
import PasswordRedirectPage from "./pages/PasswordRedirectPage";

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
                        <Route path={"/locations"}>
                            <LocationsPage geoLocation={props.coords}/>
                        </Route>
                        <Route path={"/locations/:id"}>
                            <LocationDetailsPage geoLocation={props.coords}/>
                        </Route>
                        <Route path={"/login"}>
                            <LoginPage/>
                        </Route>
                        <Route path={"/registration"} exact>
                            <RegistrationPage/>
                        </Route>
                        <Route path={"/registration/done"}>
                            <RegistrationRedirectPage/>
                        </Route>
                        <Route path={"/forgot"}>
                            <PasswordForgotPage/>
                        </Route>
                        <Route path={"/password/done"}>
                            <PasswordRedirectPage/>
                        </Route>
                        <Route path={"/password:token"}>
                            <PasswordResetPage/>
                        </Route>
                        <Route path={"/email:token"}>
                            <EmailValidationRedirectPage/>
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
