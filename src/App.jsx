import { BrowserRouter, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import VersusPage from "./pages/Versus/VersusPage";
import CreateMatch from "./components/CreateMatch/CreateMatch";
import Matches from "./components/Matches/Matches";
import Match from "./components/Match/Match";
import Devices from "./components/Devices/Devices";
import Players from "./components/Players/Players";
import Tournaments from "./components/Tournaments/Tournaments";
import Tournament from "./components/Tournament/Tournament";
import Player from "./components/Player/Player";
import PlayerForm from "./components/PlayerForm/PlayerForm";
import { Proxy } from "./components/Proxy/Proxy";

import configs from "./configs";
const API_PLAYERS = configs.apiUrl + "/api/players";

import { socketSubscriber } from "./SocketSubscriber";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const history = useHistory();
  useEffect(() => {
    socketSubscriber.addHandlers({
      "device joined match": (matchId) => {
        history.push("/match/" + matchId);
        console.log("Device joined the match: ", matchId);
      },
    });

    const defaultDevice = localStorage.getItem("defaultDevice");
    if (defaultDevice) {
      console.log("Following device: " + defaultDevice);
      socketSubscriber.socket.emit("follow device", defaultDevice);
    }
  }, []);

  useEffect(() => {
    fetch(API_PLAYERS)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("players", JSON.stringify(data.players));
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          exact={true}
          render={(routeProps) => (
            <MainLayout>
              <div className="p-2" id="match-list">
                <Matches {...routeProps} />
              </div>
            </MainLayout>
          )}
        />
        <Route
          path="/create-match"
          render={() => (
            <MainLayout>
              <CreateMatch />
            </MainLayout>
          )}
        />
        <Route
          path="/match/:id"
          render={(routeProps) => (
            <MainLayout>
              <Match id={routeProps.match.params.id}></Match>
            </MainLayout>
          )}
        />
        <Route
          path="/versus/:playerA/:playerB/:playerC?/:playerD?"
          render={(routeProps) => (
            <VersusPage players={routeProps.match.params}></VersusPage>
          )}
        />
        <Route
          path="/latest-match"
          render={() => <Match id="latest"></Match>}
        />
        <Route
          path="/devices"
          render={() => (
            <MainLayout>
              <Devices />
            </MainLayout>
          )}
        />
        <Route
          path="/players"
          render={() => (
            <MainLayout>
              <Players />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/create/player"
          render={() => (
            <MainLayout>
              <PlayerForm />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/edit/player/:id"
          render={(routeProps) => (
            <MainLayout>
              <PlayerForm id={routeProps.match.params.id} />
            </MainLayout>
          )}
        />
        <Route
          path="/player/:id"
          render={(routeProps) => (
            <MainLayout>
              <Player id={routeProps.match.params.id}></Player>
            </MainLayout>
          )}
        />
        <Route
          path="/tournaments"
          render={() => (
            <MainLayout>
              <Tournaments />
            </MainLayout>
          )}
        />
        <Route
          path="/tournament/:id"
          render={(routeProps) => (
            <MainLayout>
              <Tournament id={routeProps.match.params.id}></Tournament>
            </MainLayout>
          )}
        />
        <Route
          path="/proxy"
          render={() => (
            <MainLayout>
              <Proxy />
            </MainLayout>
          )}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
