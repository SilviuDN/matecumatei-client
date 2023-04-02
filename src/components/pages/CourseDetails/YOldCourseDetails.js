import { Component } from "react";
import CoursesService from "../../../services/courses.services";
import SectionsList from "../SectionPage/SectionsList";
import Spinner from './../../shared/Spinner'

import { Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class CourseDetails extends Component{

    constructor(){
        super()
        this.state = {
            course: undefined,
            showSections: false,
        }
        this.courseService = new CoursesService()
    }

    loadDetailsPage(){
        const {course_id} = this.props.match.params
        this.courseService
            .getCourse(course_id)
            .then( res => this.setState({course: res.data}))
            .catch( err => console.log(err))

    }

    componentDidMount(){
        this.loadDetailsPage()
        // const {course_id} = this.props.match.params
        // this.courseService
        //     .getCourse(course_id)
        //     .then( res => this.setState({course: res.data}))
        //     .catch( err => console.log(err))
    }

    toggleShowSections = () => {
        this.setState({showSections: !this.state.showSections})
    }

    renderList = () =>{
        this.loadDetailsPage()
        // this.setState({showSections: true})
    }


    render(){


        return(
            !this.state.course
            ?
            // <h4>waiting1...</h4>
            <Spinner size={60}/>
            :
            <>
            <Row className="justify-content-around">
                <Col md={6}>
                    <h1>{this.state.course.name}</h1>
                    <p>{this.state.course.description}</p>

                    <hr></hr>

                    {/* <p>Pret: <s> {this.state.course.price}$  </s> <strong style={{ color : 'red' }}>  {this.state.course.discountedPrice}$ </strong></p>

                    <hr></hr> */}

                    
                    <Link to="/courses" className="btn btn-dark">Lista de cursuri</Link>
                    <button className="btn btn-dark" onClick={this.toggleShowSections} style={{ marginLeft: '20px' }}>
                        {this.state.showSections ? 'Ascunde cuprins' : 'Arata cuprins'}                        
                    </button>

                    {/* {!this.state.course.sections || (this.state.course?.sections.length === 1 && this.state.course.sections[0]==='')
                    ?
                    <>
                    <p>Todavia no hay sections...</p>
                    </>
                    :
                    null
                    } */}

                </Col>

                <Col md={4}>
                    <img src={this.state.course.image} alt={this.state.course.name} style={{ width: '100%' }} />
                </Col>
            </Row>

                    {
                        // this.state.showSections && <LecturesList courseId={this.state.course._id} lectures={this.state.course.lectures}/>
                    }
                    {/* {

                        this.state.showSections && <SectionsList courseId={this.state.course._id} sections={this.state.course?.sections}  
                            loggedUser={this.props.loggedUser} renderList={this.renderList}/>
                    } */}

                    {/* {!this.state.course.sections || (this.state.course?.sections.length === 1 && this.state.course.sections[0]==='') */}
                    {(!this.state.course.sections || this.state.course?.sections.length === 0)
                    ?
                    this.state.showSections && <p>Todavia no hay sections...</p>
                    :
                    this.state.showSections && <SectionsList courseId={this.state.course._id} sections={this.state.course?.sections}  
                        loggedUser={this.props.loggedUser} renderList={this.renderList}/>
                    

                    }


            
            </>

        )
    }

}

export default CourseDetails