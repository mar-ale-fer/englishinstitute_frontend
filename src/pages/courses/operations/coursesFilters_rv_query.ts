import { gql } from "@apollo/client";

export const GET_COURSEFILTERS_RV = gql`
query getCoursesFilters_RV{
    coursesFilters_RV @client
}
`;