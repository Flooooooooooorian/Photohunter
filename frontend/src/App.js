import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";
import Header from "./components/Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import LocationDetailsPage from "./pages/LocationDetailsPage";
import {geolocated} from "react-geolocated";

class App extends React.Component{

    render() {
        const darkTheme = createMuiTheme({
            palette: {
                mode: 'dark',
            },
        });

        return (
            <BrowserRouter>
                <ThemeProvider theme={darkTheme}>
                    <Header/>
                    <Switch>
                        <Route path={"/locations"} exact>
                            <LocationsPage geoLocation={this.props.coords}/>
                        </Route>
                        <Route path={"/locations/:id"} exact>
                            <LocationDetailsPage geoLocation={this.props.coords}/>
                        </Route>
                    </Switch>
                </ThemeProvider>
            </BrowserRouter>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
        watchPosition: true,
    },
    userDecisionTimeout: 5000,
})(App);
