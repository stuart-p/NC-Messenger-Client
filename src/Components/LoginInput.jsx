// usernaem input
//take whatever we write, store in state
//avatar dropdown with default images to choose from - stored in state
//send back user input back to app

import React, { Component } from "react";

class LoginInput extends Component {
  state = { username: null, avatar: null };

  render() {
    const { username, avatar } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="formContainer">
          <input
            name="username"
            type="text"
            value={username}
            className="userInput"
            onChange={this.handleChange}
          ></input>
          <select
            onChange={this.handleChange}
            name="avatar"
            className="avatarInput"
          >
            <option selected disabled hidden></option>
            <option>triangle</option>
            <option>square</option>
            <option>circle</option>
          </select>
        </form>
      </>
    );
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    this.setState({ [name]: value });
  };

  handleSubmit = () => {};
}

export default LoginInput;

//{username, avatar }
