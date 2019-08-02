import React, { Component } from "react"
import { toClass } from "recompose"

import {
  Button,
  FormControl,
  FormGroup,
  Container,
  ListGroup,
  ListGroupItem
} from "styled-bootstrap-components"


const ChatComponent = (props) => {
  if (!props.pageData || !props.pageData.messages) return null;
  const { messages } = props.pageData;
  const listItems = messages.map(message => (
    <ListGroupItem>
      date: {message.date} text:{message.text}
    </ListGroupItem>
  ))
  return (
    <div>
      <Container>
        <ListGroup>{listItems}</ListGroup>
        <div>
          <FormGroup>
            <label>Text message</label>
            <FormControl
              name="newMessage"
              onChange={props.handleChange}
              textarea
              rows="3"
            />
          </FormGroup>
          <FormGroup>
            <Button primary onClick={props.sendMessage}>
              Send
            </Button>
          </FormGroup>
        </div>
      </Container>
    </div>
  )
}

export default toClass(ChatComponent)
