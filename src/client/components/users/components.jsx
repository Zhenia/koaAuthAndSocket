import React, { Component } from "react";
import styled from "styled-components";
import { Table, Tr } from "styled-table-component";

class UserListComponent extends React.Component {
  constructor () {
    super(...arguments);
  }

  render () {
    if (!this.props.pageData || !this.props.pageData.users) return null;
    const { users } = this.props.pageData;
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
          {users && users.map(user => User(user))}
        </Table>
      </div>
    )
  }

  componentWillMount (prevProps) {
    this.props.actions.loadUpListUsers();
  }
}

const User = item => {
  return (
    <Tr key="{item.id}">
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>
        <button>block/unblock</button>
        <button>delete</button>
      </td>
    </Tr>
  )
}

export default UserListComponent;
