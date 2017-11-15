import React from 'react';

import { graphql, withApollo, compose } from "react-apollo";
import gql from "graphql-tag";


const userFragment = gql`
  fragment U on User {
    login
  }
`;

const userQuery = gql`
  query Q {
    user(id: 123) {
      id
      login
    }
  }
`;

export const writeNewLoginToStore = (client, newLogin) => {

  console.log('writeNewLoginToStore / input login: ', newLogin);

  // WRITING TO FRAGMENT

  client.writeFragment({
    id: 'User:123',
    fragment: userFragment,
    data: {
      __typename: 'User',
      login: newLogin
    }
  });

  const result = client.readFragment({
    id: 'User:123',
    fragment: userFragment,
  });

  console.log(
    'writeNewLoginToStore / Login from fragment after write: ',
    result.login
  );



  // WRITING TO QUERY

  // const userData = client.readQuery({
  //   query: userQuery,
  // });
  //
  // userData.user.login = newLogin;
  //
  // client.writeQuery({
  //   query: userQuery,
  //   data: userData
  // });
  //
  // const result = client.readQuery({
  //   id: 'User:123',
  //   query: userQuery,
  // });
  //
  // console.log(
  //   'writeNewLoginToStore / Login from query after write: ',
  //   result.user.login
  // );

}


class UserForm extends React.Component {

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      'UserForm.shouldComponentUpdate / user login: ',
      nextProps.data.user.login
    );

    return true;
  }

  handleChange = ({ target: { value } }) => {

    this.setState({
      value
    });

    writeNewLoginToStore(
      this.props.client,
      value
    );

  }

  handleSubmit = () => {

    this.props.mutate({
      variables: {
        input: { login: this.state.value }
      }
    });

  }

  render() {

    if (this.props.data.loading) {
      return <span>
        loading...
      </span>;
    }

    const user = this.props.data.user;

    return (
      <div>
        <h1>UserForm:</h1>
        <h3>user: #{user.id} {user.login}</h3>

        new login:
        <input
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }

}

const getUser = graphql(userQuery);

const updateUser = graphql(gql`
  mutation M ($input: UserInput) {
    updateUser(id: 123, input: $input) {
      id
      login
    }
  }
`);


export default compose(withApollo, getUser, updateUser)(UserForm)
