import {ajax} from './user'

const BASE_URL = '/api'

//用户注册
export const userRegister = (user) => ajax(`${BASE_URL}/register`, user, "POST")

export const userLogin = (user) => ajax(`${BASE_URL}/login`, user, "POST")