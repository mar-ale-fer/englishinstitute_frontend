import { gql } from "@apollo/client";

export const GET_LEVELSFILTERS_RV = gql`
  query getLevelsFilters_RV{
    levelsFilters_RV @client
  }
`