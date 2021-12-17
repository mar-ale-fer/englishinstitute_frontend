import { gql } from "@apollo/client"

export const LEVEL_UPDATE = gql`
    mutation LevelUpdate($levelUpdateId: ID!, $name: String!) {
    levelUpdate(id: $levelUpdateId, name: $name) {
        success
        message
        level {
        id
        name 
        }
    }
    }    
`;