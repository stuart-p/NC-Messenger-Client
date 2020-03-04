import React from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import LoginInput from "./Components/LoginInput";

class App extends React.Component {
  state = {
    endpoint: "localhost:8080",
    messageArray: [],
    inputText: "",
    socket: null,
    username: null,
    avatar: null,
    loggedIn: false,
    onlineUsers: null
  };

  componentDidMount = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({ socket: socket });

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
        updatedArray.push(data);
        return { messageArray: updatedArray };
      });
    });

    socket.on("onlineUserBroadcast", data => {
      this.setState({ onlineUsers: data });
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
        {this.state.loggedIn ? (
          <p>Welcome, {this.state.username}!</p>
        ) : (
          <section>
            <LoginInput setUser={this.setUser} />

            {/* {
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
          </form> } */}
          </section>
        )}
      </div>
    );
  }

  setUser = (newUsername, newAvatar) => {
    this.setState({ username: newUsername, avatar: newAvatar, loggedIn: true });
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    // if (this.state.loggedIn) {
    //   console.log("here.......");

    socket.emit("userConnected", newUsername);
    // }
  };
}

export default App;
