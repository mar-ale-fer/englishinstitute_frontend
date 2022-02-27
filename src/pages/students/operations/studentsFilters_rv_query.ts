import { gql } from "@apollo/client";

export const GET_STUDENTFILTERS_RV = gql`
query getStudentsFilters_RV{
    studentsFilters_RV @client
}
`;