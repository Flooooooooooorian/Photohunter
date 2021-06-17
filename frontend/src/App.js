import {BrowserRouter, Switch, Route} from "react-router-dom";
import LocationsPage from "./pages/LocationsPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/locations"} exact>
            <LocationsPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
