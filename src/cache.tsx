
import { InMemoryCache, makeVar } from "@apollo/client";
import { userSessionType } from "./types/userSessionType";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userSessionReactVar:{
          read() {
            return userSessionReactVar();
          }
        },
 
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
