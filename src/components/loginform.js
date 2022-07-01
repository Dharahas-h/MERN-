import React from "react";
import axios from "axios";
import "react-router-dom";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  state = {
    stAuth: { username: "", password: "" },
  };

  handleChange = ({ target: a }) => {
    const auth = { ...this.state.stAuth };
    auth[a.id] = a.value;
    this.setState({ stAuth: auth });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const auth = this.state.stAuth;
    try {
      const response = await axios.post("/auth", {
        username: auth.username,
        password: auth.password,
      });
      console.log(response);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.logger();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { username, password } = this.state.stAuth;
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
              className="form-control"
              id="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
        {/*<div className="d-block p-2 bg-warning text-white mt-3">
          <Link to="/register">Click here</Link> to Register
    </div>*/}
      </div>
    );
  }
}

export default LoginForm;
