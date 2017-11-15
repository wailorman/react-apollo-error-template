import React from 'react';

import { graphql, withApollo, compose } from "react-apollo";
import gql from "graphql-tag";


const userQuery = gql`
  query Q {
    user(id: 123) {
      id
      login
    }
  }
`;

class SideMenu extends React.Component {

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      'SideMenu.shouldComponentUpdate / user login: ',
      nextProps.data.user.login
    );

    return true;
  }

  render() {

    if (this.props.data.loading) {
      return (
        <span>loading...</span>
      );
    }

    const user = this.props.data.user;

    return (
      <div>
        <h1>SideMenu:</h1>
        <p>
          You are logged in
          #{user.id} {user.login}
        </p>
      </div>
    );
  }

};


const getUser = graphql(userQuery)

export default compose(getUser)(SideMenu);
