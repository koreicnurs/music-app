import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Album from "./containers/Album/Album";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/albums" exact component={Albums}/>
                <Route path="/tracks" exact component={Tracks}/>
                <Route path="/albums/:id" exact component={Album}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
        </Layout>
    );
}

export default App;
