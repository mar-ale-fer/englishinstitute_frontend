import { gql } from '@apollo/client';

export const COURSE_REMOVE_STUDENT = gql`
mutation RemoveStudentFromCourse($courseId: ID!, $studentId: ID!) {
  removeStudentFromCourse(courseId: $courseId, studentId: $studentId) {
    success
    message
    course {
      id
      active
      details
      year
      students {
        id
        firstName
        lastName
        phoneNumber
      }
    }
  }
}
`;

//vars:
// {  "courseId": "33",
//   "studentId": "33"
// }