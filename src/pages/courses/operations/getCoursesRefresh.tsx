import { gql } from "@apollo/client";

export const GET_COURSES_REFRESH = gql`
  query getCoursesPageNeedsRefresh_RV{
    coursesPageNeedsRefresh_RV @client
  }
`

