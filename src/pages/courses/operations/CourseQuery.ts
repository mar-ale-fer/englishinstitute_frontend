import { gql } from '@apollo/client';

export const COURSE_QUERY = gql`
query Courses($year: Float!, $schedule: String!, $details: String!, 
    $levelId: ID!,$active: Boolean, $debug: String!) {
      courses(year: $year, schedule: $schedule, details: $details,
       levelId: $levelId, active:$active , debug: $debug) {
        success
        message
        courses {
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
        }
      }
    }
`;

//vars:
// {  "year": 0,
//   "schedule": "",  "details": "",
//   "levelId": "0",
//   "active": false,
//   "debug": ""
// }