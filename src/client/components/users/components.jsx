import React, { Component } from "react"
import styled from "styled-components"
import { Table, Tr } from "styled-table-component"
import { toClass} from 'recompose'

const UserListComponent = (props) => {
  if (!props.pageData || !props.pageData.users) return null;
  const {users} = props.pageData;
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

export default toClass(UserListComponent);
