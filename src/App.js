import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import UserForm from './UserForm';
import SideMenu from './SideMenu';

class App extends Component {
  render() {
    return (
      <main>
        <UserForm />
        <SideMenu />
      </main>
    );
  }
}

export default App;
