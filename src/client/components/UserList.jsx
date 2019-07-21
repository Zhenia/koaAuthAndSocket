import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Table,
    Tr,
} from 'styled-table-component';

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
            users:[]
        };
    }

    componentDidMount() {
        fetch('/users',{
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            .then(res => res.json())
            .then(users => this.setState({ users:users }));
    }

    renderItem(item){

        if (item){
            return( <Tr data-id="{item.id}">
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                    <button>block/unblock</button>
                    <button>delete</button>

                </td>
            </Tr>)
        }
        else
            return('');
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Options</th>
                    </tr>
                    </thead>
                    {users.map((user=>this.renderItem(user)))}
                </Table>
            </div>
        );
    }
}
