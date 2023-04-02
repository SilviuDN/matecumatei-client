import axios from 'axios'

class AuthService {

    constructor() {
        this.app = axios.create({
            // baseURL: process.env.REACT_APP_BASE_URL,
            baseURL: 'http://matecumatei.herokuapp.com/api/',
            // baseURL: 'http://localhost:5000/api/',
            withCredentials: true
        })
    }

    login = (email, pwd) => this.app.post('/login', { email, pwd })
    signup = (email, pwd, name, surname, username) => this.app.post('/signup', { email, pwd, name, surname, username })
    logout = () => this.app.get('/logout')
    isLoggedIn = () => this.app.get('/isLoggedIn')
}

export default AuthService