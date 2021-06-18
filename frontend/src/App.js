import {BrowserRouter, Switch, Route} from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";
import Header from "./components/Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';

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
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
