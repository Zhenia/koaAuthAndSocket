import React, { Component } from "react"
import OAuth from "../googleAuth"
import {Button, Input} from "./../../styles/customStyleComponents"

export default (props: any): React.ReactElement => {
  let content
  if (props.pageData && props.pageData.name) {
    const { name } = props.pageData
    content = (
      <div>
        <h1>{`Hello ${name}`}</h1>
        <Button size="0.5em" onClick={props.logout}>
          Logout
        </Button>
      </div>
    )
  } else {
    content = loginFormComponent(
      props.handleChange,
      props.sendForm,
      props.validateForm()
    )
  }
  return (content);
}

const loginFormComponent = (handleChange, sendForm, valid) => {
  return (
    <form id="form-login">
      <div>
        <Input placeholder="email" name="email" key="email" onChange={handleChange} />
      </div>
      <div>
        <Input
          placeholder="password"
          name="password" key="password"
          onChange={handleChange}
          type="password"
        />
      </div>
      <div>
        <Button
          size="0.5em"
          onClick={sendForm}
          primary="true"
          disabled={!valid}
        >
          Login in
        </Button>
        <OAuth provider="google" key="google" socket={socket}/>
      </div>
    </form>
  )
}
