import React, { Component } from "react";
import styled from "styled-components";
import { Table, Tr } from "styled-table-component";

import {
  Button,
  FormControl,
  FormGroup,
  Container,
  ListGroup,
  ListGroupItem
} from 'styled-bootstrap-components';

class ChatComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          messages:[],
          newMessage:''
      };
  }

  componentDidMount() {
          this.props.actions.loadUpListMessages();
          socket.on('messagesList',data=>this.setState({messages:data}));  
  }
 
  sendMessage = event =>{
      const textMessage = this.state.newMessage;
      if (textMessage){
          socket.emit("addMessage", textMessage);
      }
  }

  handleChange = event =>  {
          this.setState({
              [event.target.name]: event.target.value
          });
  }   


  render() {
    if (!this.props.pageData || !this.props.pageData.messages) return null;
    const { messages } = this.props.pageData;
      const listItems = messages.map(
          (message) =><ListGroupItem>date: {message.date} text:{message.text}</ListGroupItem>
      );
      return (
          <div>
              <Container>
                <ListGroup>
                    {listItems}
                </ListGroup>
                <div>
                    <FormGroup>
                    <label>Text message</label>
                    <FormControl name="newMessage" onChange={this.handleChange} textarea rows="3" />
                    </FormGroup>
                    <FormGroup>
                        <Button primary onClick={this.sendMessage}>Send</Button>
                    </FormGroup>
                </div>
              </Container>
          </div>
      );
  }
}

export default ChatComponent;
