import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Table,
    Tr,
} from 'styled-table-component';
import {
    Button,
    FormControl,
    FormGroup,
    Container,
    ListGroup,
    ListGroupItem
  } from 'styled-bootstrap-components';
export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages:[],
            newMessage:''
        };
    }

    componentDidMount() {
            this.loadMeaasages();
            socket.on('messagesList',data=>this.setState({messages:data}));  
    }

    loadMeaasages = () => {
        fetch('/messages',{
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            .then(res => res.json())
            .then(messages => this.setState({ messages:messages }));
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
        const { messages } = this.state;
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