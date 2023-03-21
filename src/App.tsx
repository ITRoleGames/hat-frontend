import CreateGame from "components/create-game/сreate-game-page.component";
import AddWordsPage from "components/add-words/add-words-page.component";
import GameCreatedPage from "components/game-created/game-created-page.component";
import HomePage from "components/home-page.component";
import JoinGamePage from "components/join-game/join-game-page.component";
import PageNotFound from "components/page-not-found.component";
import PrivateRoute from "components/private-route";
import React from "react";
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import "./App.css";
import WaitingPlayersPage from "./containers/waiting-players.container";
import GameStartedContainer from "./containers/game-started.container";
import ExplainContainer from "./containers/explain.container";
import GuessContainer from "./containers/guess.container";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/createGame" element={<CreateGame/>}/>
                <Route path="/joinGame" element={<JoinGamePage/>}/>
                <Route path="/gameCreated" element={<PrivateRoute component={GameCreatedPage}/>}/>
                <Route path="/addWords" element={<PrivateRoute component={AddWordsPage}/>}/>
                <Route path="/waitingPlayers" element={<PrivateRoute component={WaitingPlayersPage}/>}/>
                <Route path="/gameStarted" element={<PrivateRoute component={GameStartedContainer}/>}/>
                <Route path="/explain" element={<PrivateRoute component={ExplainContainer}/>}/>
                <Route path="/guess" element={<PrivateRoute component={GuessContainer}/>}/>
                <Route path="*" element={<PageNotFound/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
