import { gql } from '@apollo/client';

export const COURSE_BY_ID = gql`
query CourseById($courseByIdId: ID!, $debug: String!) {
    courseById(id: $courseByIdId, debug: $debug) {
      success
      message
      course {
        id
        year
        schedule
        details
        monthlyPrice
        active  
        auditLastUser
        level {
          id
          name
        }
        students {
            id
            firstName
            lastName
            dateOfBirth
            documentNumber
            email
            observations
            phoneNumber
        }
      }
    }
  }
`;

//vars:
// {  "courseByIdId": "5",
//   "debug": ""
// }