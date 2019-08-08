import * as React from 'react';
import { Context } from './../../user-context';
//provider  component
export default function withContext(Component) {
  return function ThemedComponent(props) {
    return (
      <Context.Consumer>
        {userContext => <Component {...props} userContext={userContext} />}
      </Context.Consumer>
    );
  };
}
