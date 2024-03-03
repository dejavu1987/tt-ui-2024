import { Component } from "react";
import { Link } from "react-router-dom";
import configs from "../../configs";
import { socketSubscriber } from "../../SocketSubscriber";

const API = configs.apiUrl + "/api/devices";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      newDevice: {},
    };

    this.socketSubscriber = socketSubscriber;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSetDefaultDeviceClick =
      this.handleSetDefaultDeviceClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      newDevice: {
        ...this.state.newDevice,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSetDefaultDeviceClick(device) {
    localStorage.setItem("defaultDevice", device);
    this.socketSubscriber.socket.emit("follow device", device);
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    fetch(configs.apiUrl + "/api/device", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.newDevice),
    })
      .then((res) => res.json())
      .then(() => this.props.history.push("/devices"));
  }

  handleEdit(event, device) {
    event.preventDefault();

    const newMatch = event.target.children[0].value;
    device.linkedMatch = newMatch;

    fetch(configs.apiUrl + "/api/device/" + device.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    })
      .then((res) => res.json())
      .then(() => this.props.history.push("/devices"));
  }

  componentDidMount() {
    fetch(API)
      .then((response) => response.json())
      .then((data) => this.setState({ devices: data.devices }));
  }

  render() {
    return (
      <div className="main-container" id="devic-list">
        <h1 className="h2">Devices</h1>
        <table className="table-auto mb-4 w-full">
          <thead className="text-left">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Linked Match</th>
            </tr>
          </thead>
          <tbody>
            {this.state.devices.map((device) => {
              return (
                <tr key={device.id} className={device.over ? "bg-light" : ""}>
                  <td>
                    <Link to={`/device/${device.id}`}>{device.id}</Link>
                  </td>
                  <td>{device.name}</td>
                  <td>
                    <div className="flex">
                      <div className="w-1/2">
                        <form
                          onSubmit={(event) => this.handleEdit(event, device)}
                        >
                          <input
                            id="event"
                            type="text"
                            defaultValue={device.linkedMatch}
                            name="name"
                            required="required"
                          />
                        </form>
                      </div>
                      <div className="w-1/2">
                        <div className="mdb-btn-group">
                          <Link to={`/match/${device.linkedMatch}`}>
                            <button
                              className="fa fas fa-external-link-alt button"
                              size="sm"
                              title="Go to linked Match!"
                            >
                              {" "}
                            </button>
                          </Link>
                          <button
                            color="rightplayer"
                            size="sm"
                            className="fa fas fa-lock button"
                            title="Make this device my default device!"
                            onClick={() =>
                              this.handleSetDefaultDeviceClick(device.id)
                            }
                          >
                            {" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2 className="h3">Add device</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="flex gap-2">
            <div className="col">
              <label>
                Name:
                <input required type="text" onChange={this.handleChange} />
              </label>
            </div>
            <div className="col">
              <label>
                Linked Match:
                <input required type="text" onChange={this.handleChange} />
              </label>
            </div>
          </div>
          <button className="mt-2" type="submit">
            <i className="fa fas fa-microchip mr-2"> </i> Add Device
          </button>
        </form>
      </div>
    );
  }
}

export default Devices;
