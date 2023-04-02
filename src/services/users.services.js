import axios from 'axios' 
 
 class UsersService{

    constructor(){
        this.app = axios.create({
            // baseURL: process.env.REACT_APP_BASE_URL + '/users'
            baseURL: 'http://matecumatei.herokuapp.com/api/users'
            // baseURL: 'http://localhost:5000/api/users'
        })
    }

    getAllUsers = () => this.app.get('/')
    getUser = userId => this.app.get(`/${userId}`)
    // saveUser = (user_info) => this.app.post('/new', user_info)
    // editUser = (user_info) => this.app.put(`/edit/${user_info._id}`, user_info)
 }

 export default UsersService