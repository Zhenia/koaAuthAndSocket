
import * as React from 'react' 
import './../app.css';
import ReactImage from './../react.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login'
import Chat from './Chat'
import UserList from './userList/components'

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

export default class App extends React.Component {
  state:object = { username: null };
  

  componentDidMount() {
    fetch('/getUsername')
      .then(res => res.json())
      .then(user => user?this.setState({ username: user.username }):'')
      .catch((err)=>console.log(err));
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
                              <Link to="/auth/">Login</Link>
                          </li>
                          <li>
                              <Link to="/chat/">Chat</Link>
                          </li>
                          <li>
                              <Link to="/user-list/">User list</Link>
                          </li>

                      </ul>
                  </nav>
                  <div className="content">
                      <Route path="/" exact component={Home} />
                      <Route path="/auth/" component={Login} />
                      <Route path="/chat/" component={Chat} />
                      <Route path="/user-list/" component={UserList} />
                  </div>

              </div>
          </Router>
      </div>
    );
  }
}
