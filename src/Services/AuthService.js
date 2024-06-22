import api from '../Api/api'


export const login = (email, password) => api.post('./signin',{email, password})
export const signup = (userData) => api.post('./signup',userData)