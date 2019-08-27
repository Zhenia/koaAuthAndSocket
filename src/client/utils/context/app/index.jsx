import * as React from 'react';
import { Context, defaultRole, defaultUserid } from './../user-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {
        roleType: defaultRole,
        role: defaultRole,
        userid: defaultUserid,
        name:''
      },
      toggleUser: (user) => {
        this.setState({
          user: user
        })
        console.log('toggleUser');
      }
    };
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
