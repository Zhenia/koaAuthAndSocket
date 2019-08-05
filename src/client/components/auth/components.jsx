import React, { Component } from "react"
import styled from "styled-components"
import GoogleAuth from "./../GoogleAuth"
import { toClass } from "recompose"

const Button = styled.a`
  background: ${props =>
    props.primary && !props.disabled ? "palevioletred" : "white"};
  color: ${props =>
    props.primary && !props.disabled ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: inline-block;
  min-width: 170px;
`;

const Input = styled.input.attrs(props => ({
  type: props.type || "text",
  size: props.size || "0.5em"
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

const LoginComponent = props => {
    console.log(props);
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
      props.validateForm,
      props.dataPage
    )
  }
  return content
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
        <GoogleAuth />
      </div>
    </form>
  )
}

export default <Component><LoginComponent {...props} /></Component> ;