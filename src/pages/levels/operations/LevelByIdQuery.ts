import { gql } from "@apollo/client"

export const LEVEL_BY_ID = gql`
    query LevelById($levelByIdId: ID!, $debug: String!) {
    levelById(id: $levelByIdId, debug: $debug) {
        success
        message
        level {
        id
        name
        }
    }
    }    
`;