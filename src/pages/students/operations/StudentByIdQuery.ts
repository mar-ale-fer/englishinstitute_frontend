import { gql } from '@apollo/client';

export const STUDENT_BY_ID = gql`
query StudentById($studentByIdId: ID!, $debug: String!) {
    studentById(id: $studentByIdId, debug: $debug) {
      success
      message
      student {
        id
        firstName
        lastName
        email
        documentNumber
        dateOfBirth
        observations
        phoneNumber
        auditLastUser
      }
    }
  }
`;

//vars:
// {  "studentByIdId": 8,
//   "debug": "dfd"
// }