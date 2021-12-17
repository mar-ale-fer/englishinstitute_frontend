
import { InMemoryCache, makeVar } from "@apollo/client";
import { userSessionType } from "./types/userSessionType";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userSessionReactVar:{
          read() { return userSessionReactVar();  }
        },
        levelsFilters_RV:{
          read() { return levelsFilters_RV() }
        },
        levelsPageNeedsRefresh_RV:{
          read() { return levelsPageNeedsRefresh_RV()}
        }

      }
    }
  }
});

export const userSessionReactVar_initialvalue : userSessionType = {
    email: '',
    firstName: '',
    lastName: '',
    roles: {roles:[]},
    backend: false
}

export const userSessionReactVar = makeVar<userSessionType>(userSessionReactVar_initialvalue)

export const levelsFilters_RV = makeVar("")

export const levelsPageNeedsRefresh_RV = makeVar<string>("")