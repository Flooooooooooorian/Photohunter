import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";
import Header from "./components/Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import LocationDetailsPage from "./pages/LocationDetailsPage";
import {geolocated} from "react-geolocated";
import LoginPage from "./pages/login/LoginPage";
import GoogleRedirectPage from "./pages/login/GoogleRedirectPage";
import AuthProvider from "./context/AuthProvider";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./routing/PrivateRoute";
import RegistrationPage from "./pages/login/RegistrationPage";
import RegistrationRedirectPage from "./pages/login/RegistrationRedirectPage";
import PasswordForgotPage from "./pages/login/PasswordForgotPage";
import PasswordResetPage from "./pages/login/PasswordResetPage";
import EmailValidationRedirectPage from "./pages/login/EmailValidationRedirectPage";
import PasswordRedirectPage from "./pages/login/PasswordRedirectPage";
import CreateLocationPage from "./pages/CreateLocationPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminUserPage from "./pages/admin/AdminUserPage";

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
                        <PrivateRoute path={"/locations/new/"}>
                            <CreateLocationPage geoLocation={props.coords}/>
                        </PrivateRoute>
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
                        <Route path={"/password/done"} exact>
                            <PasswordRedirectPage/>
                        </Route>
                        <Route path={"/password/"}>
                            <PasswordResetPage/>
                        </Route>
                        <Route path={"/email/"}>
                            <EmailValidationRedirectPage/>
                        </Route>
                        <Route path={"/auth/google/redirect"}>
                            <GoogleRedirectPage/>
                        </Route>
                        <PrivateRoute path={"/profile"}>
                            <ProfilePage/>
                        </PrivateRoute>
                        <PrivateRoute path={"/admin/Users"}>
                            <AdminUserPage/>
                        </PrivateRoute>
                        <PrivateRoute path={"/admin"} exact>
                            <AdminPage/>
                        </PrivateRoute>
                        <Route path={"/"}>
                            <LocationsPage geoLocation={props.coords}/>
                        </Route>
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
