
import { gql } from "@apollo/client";

export const LEVELS_QUERY = gql`
query Levels($name: String!, $debug: String!) {
  levels(name: $name, debug: $debug) {
    success
    message
    levels {
      id
      name
    }
  }
}
`;
