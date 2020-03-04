import React from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  state = {
    endpoint: "localhost:8080",
    messageArray: [],
    inputText: "",
    socket: null,
    username: "jessJelly"
  };

  componentDidMount = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    this.setState({ socket: socket });
    socket.emit("userConnected", this.state.username);
    socket.on("chat message", data => {
      this.setState(currentState => {
        const updatedArray = [...currentState.messageArray];
        updatedArray.push(data);
        return { messageArray: updatedArray };
      });
    });
    socket.on("connectionBroadcast", data => {
      this.setState(currentState => {
        const updatedArray = [...currentState.messageArray];
        updatedArray.push(`${data} has joined the chat`);
        return { messageArray: updatedArray };
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.state.socket.emit("chat message", this.state.inputText);
    this.setState({ inputText: "" });
  };
  handleChange = event => {
    this.setState({ inputText: event.target.value });
  };
  render() {
    return (
      <div>
        <header>
          <p>chat app...</p>
        </header>
        <section>
          <ul>
            {this.state.messageArray.map((message, iteratee) => {
              return <li key={iteratee}>{message}</li>;
            })}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.inputText}
              onChange={this.handleChange}
            ></input>
            <button>send</button>
          </form>
        </section>
      </div>
    );
  }
}

export default App;
