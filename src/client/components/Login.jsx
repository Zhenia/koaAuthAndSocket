import React, { Component } from 'react';
import styled from 'styled-components';
import GoogleAuth from './GoogleAuth.jsx';

const  Button = styled.a`
  background: ${props => props.primary && !props.disabled ? "palevioletred" : "white"};
  color: ${props => props.primary && !props.disabled? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display:inline-block;
  min-width:170px;
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

export default class Login extends Component {
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

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    sendForm = event => {
        if (this.validateForm()){
            const values = {
                email: this.state.email,
                password: this.state.password
            };
            this.sendRequest(values);
        }

    }

    logout = event => {
        localStorage.removeItem('token');
        this.setState({
            name: undefined
        });
    }

    sendRequest = (values) => {
        fetch('/login', {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrer: 'no-referrer',
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then((res)=>{
            localStorage.setItem('token', res.token); 
            this.setState({
                name: res.user
            });
        });
    }

    render() {
        const { name } = this.state;
        const form =this.renderForm(); 
        return (
            <div>
                {name ? <div><h1>{`Hello ${name}`}</h1><Button size="0.5em" onClick={this.logout} >Logout</Button></div> : form}
            </div>
        );
    }

    renderForm(){
        return (  
        <form id="form-login">
            <div>
                <Input placeholder="email" name="email" onChange={this.handleChange} />
            </div>
            <div>
                <Input placeholder="password" name="password" onChange={this.handleChange} type="password" />
            </div>
            <div>
                <Button size="0.5em" onClick={this.sendForm} primary="true" disabled={!this.validateForm()} >Login in</Button>
                <GoogleAuth/>
            </div>
        </form>)
    }
}