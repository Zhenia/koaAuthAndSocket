import * as React from 'react';
export const defaultRole = 'Guest';
export const defaultUserid = '';
export const Context = React.createContext({
  user: {
    roleType: defaultRole,
    role: defaultRole,
    userid: defaultUserid
  },
  toggleUser: () => {}
});
