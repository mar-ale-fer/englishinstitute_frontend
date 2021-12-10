import jwt from 'jwt-decode'

export const getSessionJWTToken = () => {
    return localStorage.getItem('token');
}
export const getRolesFromToken = (jwtToken) => {
    if (!jwtToken) return []

    const user = jwt(jwtToken);
    console.log(user)
    
    if (user) return user.roles

    return []
}


