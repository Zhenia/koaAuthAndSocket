import React, { Component, useState } from "react"
import {Button, Input} from "./../../styles/customStyleComponents"

export default (props: any): React.ReactElement => {
  const { errorData } = props;
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
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
        onClick={() => props.sendForm({email,password})}
        primary="true"
        disabled={!props.validateForm({email,password})}
      >
        Login in
      </Button>
      </div>
    </form>
  )
}
