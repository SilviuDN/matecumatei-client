import axios from 'axios' 
 
 class LecturesService{

    constructor(){
        this.app = axios.create({
            // baseURL: process.env.REACT_APP_BASE_URL + '/lectures'
            baseURL: 'http://matecumatei.herokuapp.com/api/lectures'
            // baseURL: 'http://localhost:5000/api/lectures'
        })
    }

    // getAllLectures = () => this.app.get('/')
    getLecture = lectureId => this.app.get(`/${lectureId}`)
    saveLecture = (lecture_info) => this.app.post('/new', lecture_info)
    editLecture = (lecture_info) => this.app.put(`/edit/${lecture_info._id}`, lecture_info)
    deleteLecture = (lecture_id) => this.app.post(`/delete/${lecture_id}`, lecture_id)
 }

 export default LecturesService