import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Displayer from "./components/displayer";
import NavBar from "./components/navBar";
import AddForm from "./components/addform";
import LoginForm from "./components/loginform";
//import Register from "./components/register";
import jwtDecode from "jwt-decode";
import Logout from "./components/logout";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

class App extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const user = jwtDecode(jwt);
      this.setState({ user });
    }
  }

  logger = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const user = jwtDecode(jwt);
      this.setState({ user });
      console.log(this.props);
    }
  };

  render() {
    const { username } = this.state.user;
    return (
      <div className="container">
        <BrowserRouter>
          {username ? <NavBar username={username} /> : null}
          <Routes>
            <Route
              path="/"
              element={
                username ? (
                  <Displayer username={username} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !username ? (
                  <LoginForm logger={this.logger} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/addform"
              element={username ? <AddForm /> : <Navigate to="/login" />}
            />
            <Route path="/logout" element={<Logout />}></Route>
            {
              //<Route path="/register" element={<Register />} />
            }
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
