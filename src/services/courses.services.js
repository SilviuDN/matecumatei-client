import axios from 'axios' 
 
 class CoursesService{

    constructor(){
        this.app = axios.create({
            // baseURL: process.env.REACT_APP_BASE_URL + '/courses'
            baseURL: 'http://matecumatei.herokuapp.com/api/courses'
            // baseURL: 'http://localhost:5000/api/courses'
        })
    }

    getAllCourses = () => this.app.get('/')
    getCourse = courseId => this.app.get(`/${courseId}`)
    saveCourse = (course_info) => this.app.post('/new', course_info)
    editCourse = (course_info) => this.app.put(`/edit/${course_info._id}`, course_info)
 }

 export default CoursesService