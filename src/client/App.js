import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login';
import googleAuth from './googleAuth';

function Home() {
    return (
            <div>
                <h2>Home</h2>
                <img src={ReactImage} alt="react" />
           </div>
    );
}

function Users() {
    return <h2>Users</h2>;
}

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
          <Router>
              <div>
                  <nav>
                      <ul>
                          <li>
                              <Link to="/">Home</Link>
                          </li>
                          <li>
                              <Link to="/login/">Login</Link>
                          </li>
                          <li>
                              <Link to="/googleAuth/">googleAuth</Link>
                          </li>
                      </ul>
                  </nav>
                  <div className="content">
                      <Route path="/" exact component={Home} />
                      <Route path="/login/" component={Login} />
                      <Route path="/googleAuth/" component={googleAuth} />
                  </div>

              </div>
          </Router>
      </div>
    );
  }
}
