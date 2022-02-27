import { gql } from '@apollo/client';

export const STUDENT_UPDATE = gql`
mutation StudentUpdate($studentUpdateId: ID!, $firstName: String!, $lastName: String!, $documentNumber: String!, $dateOfBirth: String!, $phoneNumber: String!, $email: String!, $observations: String!) {
    studentUpdate(id: $studentUpdateId, firstName: $firstName, lastName: $lastName, documentNumber: $documentNumber, dateOfBirth: $dateOfBirth, phoneNumber: $phoneNumber, email: $email, observations: $observations) {
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
      }
    }
  }
  `;

//   vars:
//   {  "studentUpdateId": 4,
//   "firstName": "Sebastián",  "lastName": "Moreno",
//   "documentNumber": "34658987",  "dateOfBirth": "13/10/1980",
//   "phoneNumber": "2994687451",  "email": "sebamoreno@gmail.com",
//   "observations": "El Mole..."
// }