import React from "react";
import {NativeRouter, Route, Switch} from "react-router-native";
import LocationsPage from "./src/pages/LocationsPage";
import Header from "./src/components/Header";
import LocationDetailsPage from "./src/pages/LocationDetailsPage";
import LoginPage from "./src/pages/LoginPage";
import GoogleRedirectPage from "./src/pages/GoogleRedirectPage";
import AuthProvider from "./src/context/AuthProvider";
import ProfilePage from "./src/pages/ProfilePage";
import PrivateRoute from "./src/routing/PrivateRoute";
import RegistrationPage from "./src/pages/RegistrationPage";
import RegistrationRedirectPage from "./src/pages/RegistrationRedirectPage";
import PasswordForgotPage from "./src/pages/PasswordForgotPage";
import PasswordResetPage from "./src/pages/PasswordResetPage";
import EmailValidationRedirectPage from "./src/pages/EmailValidationRedirectPage";
import PasswordRedirectPage from "./src/pages/PasswordRedirectPage";
import CreateLocationPage from "./src/pages/CreateLocationPage";

export default function App(props) {

    return (
        <NativeRouter>
            <AuthProvider>
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
                    <Route path={"/"}>
                        <LocationsPage geoLocation={props.coords}/>
                    </Route>
                </Switch>
            </AuthProvider>
        </NativeRouter>
    );
}
