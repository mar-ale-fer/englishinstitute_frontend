import { gql } from '@apollo/client';

export const COURSE_CREATE = gql`
mutation CourseCreate($year: Float!, $schedule: String!, $details: String!, $monthlyPrice: Float!, $active: Boolean!, $levelId: ID!) {
    courseCreate(year: $year, schedule: $schedule, details: $details, monthlyPrice: $monthlyPrice, active: $active, levelId: $levelId) {
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
// {  "year": 2023,
//   "schedule": "días ",  "details": "detalles...",
//   "monthlyPrice": 50.4,
//   "levelId": 1,
//   "active": true
// }