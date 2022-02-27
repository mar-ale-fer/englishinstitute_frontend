import { gql } from '@apollo/client';

export const STUDENT_CREATE = gql`
mutation StudentCreate($firstName: String!, $lastName: String!, $documentNumber: String!, $dateOfBirth: String!, $phoneNumber: String!, $email: String!, $observations: String!) {
    studentCreate(firstName: $firstName, lastName: $lastName, documentNumber: $documentNumber, dateOfBirth: $dateOfBirth, phoneNumber: $phoneNumber, email: $email, observations: $observations) {
      success
      message
      student {
        firstName
        lastName
      }
    }
  }
`;

//var
// {  "firstName": "Gabriela Andrea",
//   "lastName": "Alarcón",  "documentNumber": "29795730",
//   "dateOfBirth": "14/10/1982",  "phoneNumber": "2994620073",
//   "email": "gabyal53@hotmail.com",
//   "observations": "fairedelart pijamadasnqn mostrando la hilacha"
// }