import { gql } from '@apollo/client';

export const COURSE_ADD_STUDENT = gql`
mutation AddStudentToCourse($courseId: ID!, $studentId: ID!) {
  addStudentToCourse(courseId: $courseId, studentId: $studentId) {
    success
    message
    course {
      active
      details
      schedule
    }
  }
}
`;

//vars:
// {  
//   "courseId": "33",
//   "studentId": "33"
// }