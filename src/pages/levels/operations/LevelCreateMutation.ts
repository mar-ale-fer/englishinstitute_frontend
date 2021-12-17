import { gql } from "@apollo/client"

export const LEVEL_CREATE = gql`
    mutation LevelCreate($name: String!) {
    levelCreate(name: $name) {
        success
        message
        level {
        id
        name
        }
    }
    }    
`;