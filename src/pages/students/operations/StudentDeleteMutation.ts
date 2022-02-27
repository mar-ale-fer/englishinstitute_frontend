import { gql } from '@apollo/client';

export const STUDENT_DELETE = gql`
mutation StudentDelete($studentDeleteId: ID!) {
    studentDelete(id: $studentDeleteId) {
      success
      message
      student {
        id
        firstName
        lastName
        email
        documentNumber
        auditLastUser
        dateOfBirth
        observations
        phoneNumber
      }
    }
  }
`;

//vars:
// {
//   "studentDeleteId": 3
// }