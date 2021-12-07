
import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
mutation UpdateUserMutation($updateUserId: ID!,
    $updateUserCode: String, 
    $updateUserCode2: String,     
    $updateUserFirstName: String, 
    $updateUserLastName: String, 
    $updateUserEmail: String,
    $updateUserStatus: String,
    $updateUserType: String
) {
  updateUser(id:$updateUserId ,
    code: $updateUserCode, 
    code2: $updateUserCode2, 
    firstName: $updateUserFirstName, 
    lastName: $updateUserLastName, 
    email: $updateUserEmail, 
    status: $updateUserStatus,
    type: $updateUserType){
    success
    message
    user {
      id
      code
      code2
      firstName
      lastName
      email
      status
      type
    }
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUserMutation(
    $createUserCode: String!, 
    $createUserCode2: String!, 
    $createUserFirstName: String!, 
    $createUserLastName: String!, 
    $createUserEmail: String!,
    $createUserType: String!
) {
  createUser(
  code: $createUserCode, 
  code2: $createUserCode2, 
  firstName: $createUserFirstName, 
  lastName: $createUserLastName, 
  email: $createUserEmail,
  type: $createUserType) {
    success
    message
    user {
      id
      code
      code2
      firstName
      lastName
      email
      status
      type
      __typename
    }
  }
}
`;

export const DELETE_USER = gql`
mutation DeleteUserMutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    success
    message
    user {
      id
    }
  }
}
`;

export const ADD_ROLE_TO_USER = gql`
mutation AddRoleToUserMutation($addRoleToUserId: ID!, $roleId: ID!) {
  addRoleToUser(id: $addRoleToUserId, roleId: $roleId) {
    success
    message
    user {
      id
    }
  }
}
`;

export const REMOVE_ROLE_FROM_USER = gql`
mutation RemoveRoleFromUserMutation($removeRoleFromUserId: ID!, $roleId: ID!) {
  removeRoleFromUser(id: $removeRoleFromUserId, roleId: $roleId) {
    success
    message
    user {
      id
    }
  }
}
`;