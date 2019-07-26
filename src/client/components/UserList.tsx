import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Table,
    Tr,
} from 'styled-table-component';

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
