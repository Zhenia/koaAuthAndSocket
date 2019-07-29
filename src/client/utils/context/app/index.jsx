import * as React from 'react';
import { Context, defaultRole, defaultUserid } from './../user-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleUser = user => {
      this.setState({
        user: user
      });
    };

    this.state = {
      user: {
        roleType: defaultRole,
        role: defaultRole,
        userid:defaultUserid
      },
      toggleUser: this.toggleUser
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
}
