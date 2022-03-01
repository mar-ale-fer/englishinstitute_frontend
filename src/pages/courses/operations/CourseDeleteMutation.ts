import { gql } from '@apollo/client';

export const COURSE_DELETE = gql`
mutation CourseDelete($courseDeleteId: ID!) {
    courseDelete(id: $courseDeleteId) {
      success
      message
      course {
        id
        year
        schedule
        details
        monthlyPrice
        active      
      }
    }
  }
`;

//vars:
// {
//     "courseDeleteId": 2
// }