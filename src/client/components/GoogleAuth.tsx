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

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: "",
            password: ""
        };
    }
    componentDidMount() {
        fetch('/getUsername',{
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            .then(res => res.json())
            .then(user => this.setState({ name: user.name }));
    }

    sendForm = event => {
        this.sendRequest();
    }

    sendRequest = () => {
        fetch('/auth/google', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
            .then(res => res.json())
            .then((res)=>{
                console.log('отослано в google');
            });
    }

    
    render() {
        const { name } = this.state;
        return (
            <div>
                <Button href="/auth/google">Sign in with google</Button>
            </div>
        );
    }
}