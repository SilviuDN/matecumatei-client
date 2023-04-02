import { Component } from "react";
import CoursesService from "../../../services/courses.services";
import Spinner from './../../shared/Spinner'

import { Row } from 'react-bootstrap'
import CourseCard from "./CourseCard";

class CoursesList extends Component{

    constructor(){
        super()
        this.state = {
            courses: undefined
        }
        this.coursesService = new CoursesService()
    }

    loadCourses = () => {
        this.coursesService
            .getAllCourses()
            .then( res => this.setState({courses: res.data}))
            .catch( err => console.log(err))
    }

    componentDidMount = () => {
        this.loadCourses()
    }

    render(){

        const coursesList = !this.state.courses
            ?
            // <h1>waiting2...</h1>
            <Spinner size={200}/>
            :
            <Row>
                {this.state.courses?.map( elm => <CourseCard key = {elm._id} {...elm}/>)}
            </Row>

        return(
            <>
                {coursesList}
            </>
            
            
        )
    }
}

export default CoursesList