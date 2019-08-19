import React, { useState, useReducer, useEffect } from "react"
import reducer, { initialState } from './reducer'
import {Button, Input} from "./../../styles/customStyleComponents"
import * as actions from './actions'

export default (props: any): React.ReactElement => {
  const { errorData } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isUserInPageData = props.userContext && (!props.userContext.user || !props.userContext.user.name) && props.pageData && props.pageData.name
    if (isUserInPageData){
      props.userContext.toggleUser({
        name: name,
        email: email
      });
    }
  })

  const validateForm = (data) => {
    return data && data.email && data.password;
  }

  const sendForm = (data) => {
    if (validateForm(data)){
        return () => dispatch(actions.loginFormUser(data))
    }
    return false;
  }  

  return (
    <form id="form-login">
      <div>
        <Input placeholder="email" name="email" key="email" onChange={(event)=>setEmail(event.target.value)} />
      </div>
      <div>
        <Input
          placeholder="password"
          name="password" key="password"
          onChange={(event)=>setPassword(event.target.value)}
          type="password"
        />
      </div>
      {errorData && errorData.message}
      <div>
      <Button
        size="0.5em"
        onClick={sendForm({email,password})}
        primary="true"
        disabled={!validateForm({email,password})}
      >
        Login in
      </Button>
      </div>
    </form>
  )
}
