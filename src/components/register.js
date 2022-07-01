import React from "react";
import axios from "axios";

class Register extends React.Component {
  state = {
    details: { username: "", password: "" },
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state.details;
    const response = await axios.post("/register", {
      username: username,
      password: password,
    });

    const token = response.headers["x-auth-token"];
    localStorage.setItem("token", token);
    window.location = "/";
  };

  handleChange = ({ target: a }) => {
    const detail = { ...this.state.details };
    detail[a.id] = a.value;
    this.setState({ details: detail });
  };

  render() {
    const { username, password } = this.state.details;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              className="form-control"
              id="username"
              type="text"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              placeholder="Set up a password"
              className="form-control"
              id="password"
              type="text"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
