import React from 'react';
import { gql, graphql } from 'react-apollo';

const Home = ({ data: { allUsers = [] }}) => loading ? null : allUsers.map(u => (
  <h1 key={u.id}>
    {u.email}
  </h1>
));
// const Home = ({ data: {loading, allUsers}}) => loading ? null : allUsers.map(u => (
//   <h1 key={u.id}>
//     {u.email}
//   </h1>
// ));

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;


export default graphql(allUsersQuery)(Home);