import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Album from "./containers/Album/Album";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/artists/new" exact component={NewArtist}/>
                <Route path="/albums" exact component={Albums}/>
                <Route path="/albums/new" exact component={NewAlbum}/>
                <Route path="/tracks" exact component={Tracks}/>
                <Route path="/tracks/new" exact component={NewTrack}/>
                <Route path="/albums/:id" exact component={Album}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/track-history" component={TrackHistory}/>
                <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
        </Layout>
    );
}

export default App;
