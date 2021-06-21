import {BrowserRouter, Switch, Route} from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";
import Header from "./components/Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import LocationDetailsPage from "./pages/LocationDetailsPage";

function App() {
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
                        <LocationsPage/>
                    </Route>
                    <Route path={"/locations/:id"} exact>
                        <LocationDetailsPage/>
                    </Route>
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
