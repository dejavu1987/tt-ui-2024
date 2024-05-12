import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import configs from "../../configs";
import Flag from "../Flag/Flag";

const API = configs.apiUrl + "/api/players";

/**
 * Players Component lists players in the system
 * @param props
 * @returns {*}
 * @constructor
 */

const Players = ({ history }) => {
  const [players, setPlayers] = useState([]);

  function handleEdit(event, player) {
    event.preventDefault();

    const newUuid = event.target.children[0].value;
    player.uuid = newUuid;

    fetch(configs.apiUrl + "/api/player/" + player.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
      .then((res) => res.json())
      .then(() => history.push("/players"));
  }

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setPlayers(data.players));
  }, []);

  return (
    <div className="main-container" id="devic-list">
      <h1 className="h2">Players</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>NUID</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            return (
              <tr key={player.id} className={player.over ? "bg-light" : ""}>
                <td>
                  <Link to={`/player/${player.id}`}>{player.id}</Link>
                </td>
                <td>{player.name}</td>
                <td>
                  {player.nationality && (
                    <Flag country={player.nationality} size={32} />
                  )}
                </td>
                <td>
                  <div className="row">
                    <div className="col-9">
                      <form onSubmit={(event) => handleEdit(event, player)}>
                        <input
                          id="event"
                          type="text"
                          defaultValue={player.uuid}
                          name="uuid"
                          required="required"
                        />
                      </form>
                    </div>
                    <div className="col-3">
                      {/*<Link to={`/match/${player.linkedMatch}`}><i className="fa fas fa-link"></i></Link>*/}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
