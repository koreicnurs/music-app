import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
        </Layout>
    );
}

export default App;
