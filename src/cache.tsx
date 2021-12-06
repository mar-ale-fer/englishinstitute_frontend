
import { InMemoryCache, makeVar } from "@apollo/client";
// import { VisibilityFilter, VisibilityFilters } from "./models/VisibilityFilter";

export const cache: InMemoryCache = new InMemoryCache({})

// export const cache: InMemoryCache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         visibilityFilter: {
//           read () {
//             return visibilityFilterVar();
//           },
//         },
//         myReactiveVariable: {
//           read() {
//             return myReactiveVariable();
//           }
//         },
//         userFiltersReactVar:{
//           read() {
//             return userFiltersReactVar();
//           }
//         },
//         applicationFiltersReactVar:{
//           read() {
//             return applicationFiltersReactVar();
//           }
//         },
//         ApplicationsListRefreshFlag: {
//           read() {
//             return applicationsListRefreshFlag();
//           }
//         },

//       }
//     }
//   }
// });

// export const visibilityFilterVar = makeVar<VisibilityFilter>(
//   VisibilityFilters.SHOW_ALL
// )

// export const myReactiveVariable = makeVar('');
// /**
//  * User's filters with initialization
//  */

//  export const applicationsListRefreshFlag = makeVar('');

//  export type userFiltersType = {
//   code: string,
//   code2: string,
//   firstName: string,
//   lastName: string,
//   email: string
// }

// const userFiltersReact_initialvalue : userFiltersType = {
//   code: '',
//   code2: '',
//   firstName:'',
//   lastName:'',
//   email:''
// }

// export const userFiltersReactVar = makeVar<userFiltersType>(userFiltersReact_initialvalue)

// /**
//  * Application's filters with initialization
//  */

// export type applicationFiltersType = {
//   code: string,
//   name: string
// }

// const applicationFiltersReact_initialvalue : applicationFiltersType = {
//   code: '',
//   name: ''
// }

// export const applicationFiltersReactVar = makeVar<applicationFiltersType>(applicationFiltersReact_initialvalue)