import {BrowserRouter, Switch, Route} from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path={"/locations"} exact>
                    <LocationsPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
