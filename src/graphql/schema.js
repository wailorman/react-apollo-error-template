const { makeExecutableSchema } = require('graphql-tools');
const gql = require('graphql-tag');

// DATABASE
let users = [{
  id: 123,
  login: 'wailorman'
}];

const types = gql`
  type User {
    id: ID!
    login: String
  }

  input UserInput {
    login: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    updateUser(id: ID!, input: UserInput): User
  }
`

const resolvers = {
  Query: {
    user: (obj, args) => {
      return users.find((user) => user.id == args.id);
    },
  },
  Mutation: {
    updateUser: (obj, args) => {
      users = users.map((user) => {
        if (user.id == args.id) {
          return {
            ...user,
            ...args.input
          };
        } else {
          return user;
        }
      });

      return users.find((user) => user.id == args.id);
    }
  }
};

let schema = makeExecutableSchema({
  typeDefs: types,
  resolvers: resolvers,
});


module.exports = schema;
