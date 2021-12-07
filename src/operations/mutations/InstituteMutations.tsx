
import { gql } from "@apollo/client";

export const CREATE_INSTITUTE = gql`
mutation CreateInstituteWithUserMutation($createInstituteWithUserName: String!, $createInstituteWithUserFirstName: String!, $createInstituteWithUserLastName: String!, $createInstituteWithUserEmail: String!, $createInstituteWithUserPassword: String!) {
  createInstituteWithUser(name: $createInstituteWithUserName, firstName: $createInstituteWithUserFirstName, lastName: $createInstituteWithUserLastName, email: $createInstituteWithUserEmail, password: $createInstituteWithUserPassword) {
    success
    message
    institute {
      id
      name
      active
    }

  }
}
`;

//Variables example:
// {
// 	"createInstituteWithUserName": "admin institute7",
// 	"createInstituteWithUserFirstName": "Marcelo",
// 	"createInstituteWithUserLastName": "Fernandez",
// 	"createInstituteWithUserEmail": "mar.ale.fer2@gmail.com",
// 	"createInstituteWithUserPassword": "19921124"
// }