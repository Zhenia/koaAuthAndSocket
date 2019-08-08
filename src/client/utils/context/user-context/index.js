import * as React from 'react';
export const defaultRole = 'Guest';
export const defaultUserid = '';
export const Context = React.createContext({
  user: {
    roleType: defaultRole,
    role: defaultRole,
    userid: defaultUserid,
    name:'',
    email:'hhhhh'
  },
  tuser:'9999',
  toggleUser: () => {
    alert(1111);
  }
});
