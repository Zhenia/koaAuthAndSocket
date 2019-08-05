import React, { Component } from "react"
import {
  Button,
  FormControl,
  FormGroup,
  Container,
  ListGroup,
  ListGroupItem
} from "styled-bootstrap-components"

export default (props: any): React.ReactElement => {
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
              value={props.pageData.newMessage}
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
