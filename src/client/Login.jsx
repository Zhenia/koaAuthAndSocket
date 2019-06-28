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
        fetch('/getUsername')
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
        
        console.log(this.state);
        if (this.validateForm()){
            const values = {
                email: this.state.email,
                password: this.state.password
            };
            this.sendRequest(values);
        }

    }

    sendRequest = (values) => {
        fetch('/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(values), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        })
        .then(res => res.json())
        .then((res)=>{
           /* var socket = io.connect('http://localhost:9000', {
                            'query': 'token=' + res.jwt
                            });*/
        });
    }

    render() {
        const { name } = this.state;
        return (
            <div>
                {name ? <h1>{`Hello ${name}`}</h1> : <h1>Loading.. please wait!</h1>}
                <form id="form-login">
                    <div>
                        <Input placeholder="email" name="email" onChange={this.handleChange} />
                    </div>
                    <div>
                        <Input placeholder="password" name="password" onChange={this.handleChange} type="password" />
                    </div>
                    <br/>
                    <div>
                        <Button size="0.5em" onClick={()=>alert('Cancel')}>Cancel</Button>
                        <Button size="0.5em" onClick={this.sendForm} primary="true" disabled={!this.validateForm()} >Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}