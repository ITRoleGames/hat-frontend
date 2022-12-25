import CreateGame from "components/create-game/сreate-game-page.component";
import CreateWordsPage from "components/create-words-page/create-words-page.component";
import GameCreatedPage from "components/game-created/game-created-page.component";
import HomePage from "components/home-page.component";
import JoinGamePage from "components/join-game/join-game-page.component";
import PageNotFound from "components/page-not-found.component";
import PrivateRoute from "components/private-route";
import React from "react";
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/createGame" element={ <CreateGame/> }/>
                <Route path="/joinGame" element={ <JoinGamePage/> }/>
                <Route path="/gameCreated" element={ <PrivateRoute component={ GameCreatedPage }/> }/>
                <Route path="/createWords" element={ <PrivateRoute component={ CreateWordsPage }/> }/>
                <Route path="*" element={ <PageNotFound/> }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
