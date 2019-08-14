import React, { Component, useState  } from "react"
import OAuth from "../googleAuth"
import LoginForm from "../loginForm"
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
    content = 
            <div>
                <LoginForm {...props} /> 
                <OAuth provider="google" key="google" userContext={props.userContext} socket={socket}/>
            </div>
  }
  return (content);
}
  