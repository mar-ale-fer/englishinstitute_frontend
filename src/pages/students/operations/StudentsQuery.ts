import { gql } from '@apollo/client';

export const STUDENTS_QUERY = gql`
query Students($firstName: String!, $lastName: String!, $documentNumber: String!, $email: String!, $observations: String!, $debug: String!) {
  students(firstName: $firstName, lastName: $lastName, documentNumber: $documentNumber, email: $email, observations: $observations, debug: $debug) {
    success
    message
    students {
      id
      firstName
      lastName
      email
      documentNumber
      observations
      dateOfBirth
    }
  }
}
  `;

//   vars:
// {  "firstName": "",
//   "lastName": "",  "documentNumber": "",
//   "phoneNumber": "",  "email": "",
//   "observations": "",
//   "debug": "ddfd"
// }