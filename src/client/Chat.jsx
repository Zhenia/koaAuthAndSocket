import React, { Component } from 'react';
import styled from 'styled-components';


const  Button = styled.a`
  background: ${props => props.primary && !props.disabled ? "palevioletred" : "white"};
  color: ${props => props.primary && !props.disabled? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const Input = styled.input.attrs(props => ({
    type: props.type || "text",
    size: props.size || "0.5em",
}))`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    margin: ${props => props.size};
    padding: ${props => props.size};
    `;

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages:[]
        };
    }


    renderMessage(message){
        return(
            <div>
                <div>{message.date}</div>
                <div>{message.author}</div>
                <div>{message.text}</div>
            </div>
        )

    }

    render() {
        const { messages } = this.state;
        return (
            <div>
                <textarea name="message"></textarea>
                <button>Отправить</button>
            </div>
        );
    }
}