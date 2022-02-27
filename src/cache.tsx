import { InMemoryCache, makeVar } from "@apollo/client";
import { userSessionType } from "./types/userSessionType";
import { usersFiltersType } from "./pages/users/operations/UsersFiltersType";
import { studentsFiltersType } from "./pages/students/operations/StudentsFiltersType";
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
        },
        usersFilters_RV:{
          read() { return usersFilters_RV()}
        },
        usersPageNeedsRefresh_RV:{
          read() { return usersPageNeedsRefresh_RV()}
        },
        studentsFilters_RV:{
          read() { return studentsFilters_RV()}
        },
        studentsPageNeedsRefresh_RV:{
          read() { return usersPageNeedsRefresh_RV()}
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

export const levelsFilters_RV = makeVar("")
export const levelsPageNeedsRefresh_RV = makeVar<string>("")

export const usersFilters_RV_initialvalue : usersFiltersType = {
  firstName: "",
  lastName: "",
  email: ""
}
export const usersFilters_RV = makeVar<usersFiltersType>(usersFilters_RV_initialvalue);
export const usersPageNeedsRefresh_RV = makeVar<string>("");

export const studentsFilters_RV_initialvalue : studentsFiltersType = {
  firstName: "",
  lastName: "",
  email: "",
  documentNumber: "",
  observations: "",
}
export const studentsFilters_RV = makeVar<studentsFiltersType>(studentsFilters_RV_initialvalue)
export const studentsPageNeedsRefresh_RV = makeVar<string>("");
