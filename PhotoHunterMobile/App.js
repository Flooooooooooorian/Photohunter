import React from "react";
import {NativeRouter, Route} from "react-router-native";
import LocationsPage from "./pages/LocationsPage";
import Header from "./components/Header";
import LocationDetailsPage from "./pages/LocationDetailsPage";
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
import CreateLocationPage from "./pages/CreateLocationPage";

export default function App(props) {

    return (
        <NativeRouter>
            <AuthProvider>
                <Header/>
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
                <Route path={"/"}>
                    <LocationsPage geoLocation={props.coords}/>
                </Route>
            </AuthProvider>
        </NativeRouter>
    );
}
