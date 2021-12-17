import { gql } from "@apollo/client";

export const LEVEL_DELETE = gql`
mutation LevelDelete($levelDeleteId: ID!) {
	levelDelete(id: $levelDeleteId) {
		success
		message
		level {
			id
			name
		}
	}
}
`;
