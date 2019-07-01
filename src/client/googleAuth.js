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

export default class googleAuth extends Component {

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

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    sendForm = event => {       
        this.sendRequest();
    }

    sendRequest = () => {
        fetch('/auth/google', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
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
                {name ? <h1>{`Hello ${name}`}</h1> : <h1>Loading.. please wait!</h1>}
                <form id="form-login">
                
                    <div>
                    <a href="/auth/google">Login with Google</a>
                    </div>
                </form>
            </div>
        );
    }
}