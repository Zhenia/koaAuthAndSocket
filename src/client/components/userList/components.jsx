import React, { Component } from 'react';
import styled from 'styled-components';
import {
    Table,
    Tr,
} from 'styled-table-component';
import { connect } from "react-redux";


const UserList = ({ users }) => (
 <div>
  <Table>
      <thead>
      <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Options</th>
      </tr>
      </thead>
      {users && users.map((user=>User(user)))}
  </Table>
</div>
);

const User = ({item})=>{
        return( <Tr key="{item.id}">
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
                <button>block/unblock</button>
                <button>delete</button>
            </td>
        </Tr>)
}

const UserList.propTypes = {
    isOpened: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

export default List;
