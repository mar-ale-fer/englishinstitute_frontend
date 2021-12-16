type roleType = 'STUDENT' | 'TEACHER' | 'ADMINISTRATOR' | 'INSTITUTE' | 'SECRETARY'
export type roleAndAllType = roleType | 'LOGGED-IN' | 'LOGGED-OUT'

export type rolesType = {
    roles: roleType[]
  }
