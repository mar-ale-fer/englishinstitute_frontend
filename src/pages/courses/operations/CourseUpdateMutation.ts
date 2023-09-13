import { gql } from '@apollo/client';

export const COURSE_UPDATE = gql`
mutation CourseUpdate($courseUpdateId: ID!, $year: Float!, $schedule: String!, $details: String!, $monthlyPrice: Float!, $active: Boolean!, $levelId: ID!) {
    courseUpdate(id: $courseUpdateId, year: $year, schedule: $schedule, details: $details, monthlyPrice: $monthlyPrice, active: $active, levelId: $levelId) {
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
//     "courseUpdateId": 5,
//     "year": 2023,
//     "schedule": "días ",  "details": "detalles 222...",
//     "details" : "details 2",
//     "monthlyPrice": 50.4,
//     "levelId": 3,
//     "active": false
//   }