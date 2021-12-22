import { gql } from '@apollo/client'

export const USERS_QUERY = gql`
query Users($firstName: String!, $lastName: String!, $email: String!) {
  users(firstName: $firstName, lastName: $lastName, email: $email) {
    success
    message
    users {
      id
      firstName
      lastName
      email
      roles {
        roles
      }
    }
  }
}
`;