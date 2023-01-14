import {CompatClient, Stomp} from "@stomp/stompjs";
import CreateGame from "components/create-game/сreate-game-page.component";
import AddWordsPage from "components/add-words/add-words-page.component";
import GameCreatedPage from "components/game-created/game-created-page.component";
import HomePage from "components/home-page.component";
import JoinGamePage from "components/join-game/join-game-page.component";
import PageNotFound from "components/page-not-found.component";
import PrivateRoute from "components/private-route";
import React, {useEffect, useState} from "react";
import {Routes} from "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import SockJS from "sockjs-client";
import "./App.css";
import WaitingPlayersPage from "./components/waiting-players/waiting-players-page.component";

const WS_URL = "ws://localhost:9000/game";

function App() {

    const [stompClient, setStompClient] = useState<CompatClient | undefined>()
    const [messages, setMessages] = useState<string[]>([])
    const [disconnectMessages, setDisconnectMessages] = useState<string[]>([])

    function connect() {
        const socket = new SockJS("http://localhost:9002/api/v1/game/ws"); //todo: why http
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame: any) => {
            console.log("Connected: " + frame);
            stompClient.subscribe("/topic/game", function (msg) {
                console.log("message received " + JSON.stringify(msg))
                showGreeting(JSON.parse(msg.body).content);
            });
            // stompClient.subscribe('/topic/chat/disconnect', function (msg) {
            //     setDisconnectMessages(x => [...x, JSON.parse(msg.body).content]);
            // });
        });
        return stompClient;
    }

    function disconnect() {
        if (stompClient) {
            stompClient.send("/app/chat/disconnect", {}, JSON.stringify({"content": "disconnected"}));
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    function sendMessage(message: string) {
        if (stompClient) {
            stompClient.send("/app/chat/message", {}, JSON.stringify({"content": message}));
        }
    }

    function showGreeting(message: string) {
        console.log("called")
        setMessages(x => [...x, message])
    }

    function clearDisconnectMessage() {
        setDisconnectMessages([])
    }


    useEffect(() => {
        if (!stompClient) {
            setStompClient(connect())
        }
        return () => {
            disconnect()
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/createGame" element={ <CreateGame/> }/>
                <Route path="/joinGame" element={ <JoinGamePage/> }/>
                <Route path="/gameCreated" element={ <PrivateRoute component={ GameCreatedPage }/> }/>
                <Route path="/addWords" element={ <PrivateRoute component={ AddWordsPage }/> }/>
                <Route path="/waitingPlayers" element={ <PrivateRoute component={ WaitingPlayersPage }/> }/>
                <Route path="*" element={ <PageNotFound/> }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
