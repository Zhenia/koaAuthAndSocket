import React, { Component } from 'react';
import styled from 'styled-components';
import GoogleAuth from './../GoogleAuth';

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

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: "",
            password: "",
            token:""
        };
    }

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }

    sendForm =  (event) => {
        if (this.validateForm()){
            const values = {
                email: this.state.email,
                password: this.state.password
            };
            return  this.props.actions.loginFormUser(values);
        }
        return false;
    }

    logout = (event) => {
        windows.localStorage.removeItem('token');
    }
    

    render() {
        let content;
        if (this.props.pageData && this.props.pageData.name) {
            const { name } = this.props.pageData;            
            content = (<div><h1>{`Hello ${name}`}</h1><Button size="0.5em" onClick={this.logout} >Logout</Button></div>)
        }
        else{            
            content = (loginFormComponent(this.handleChange,this.sendForm,this.validateForm));
        }  
        return (content);
    }
}

// чистый компонент
const loginFormComponent = (handleChange,sendForm,valid) => {
    return (  
    <form id="form-login">
        <div>
            <Input placeholder="email" name="email" onChange={handleChange} />
        </div>
        <div>
            <Input placeholder="password" name="password" onChange={handleChange} type="password" />
        </div>
        <div>
            <Button size="0.5em" onClick={sendForm} primary="true" disabled={!valid} >Login in</Button>
            <GoogleAuth/>
        </div>
    </form>)
}