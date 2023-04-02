import { Component } from "react";
import CoursesService from "../../../services/courses.services";
import SectionsList from "../SectionPage/SectionsList";
import Spinner from './../../shared/Spinner'
import SectionForm from "../SectionForm/SectionForm";
import classes from '../SectionPage/SectionPage.module.css';

import { Row, Col} from 'react-bootstrap'
// import {Link} from 'react-router-dom'
import CourseTabs from "./CourseTabs";
import CourseHeader from "./CourseHeader";
import LectureVideo from "../LecturePage/LectureVideo";



class CourseDetails extends Component{

    constructor(){
        super()
        this.state = {
            course: undefined,
            showSections: false,
            currentSection: 3,
            currentLecture: 1,
            currentVideo: undefined,
            newSectionFormIsShown: false,
        }
        this.courseService = new CoursesService()
    }

    loadDetailsPage(){
        const {course_id} = this.props.match.params
        this.courseService
            .getCourse(course_id)
            .then( res => this.setState({course: res.data, currentVideo: res.data.currentVideo}))
            .catch( err => console.log(err))
    }

    setCurrentSectionAndLecture(sectionNumber, lectureNumber){
        this?.setState({currentSection: sectionNumber, currentLecture: lectureNumber})
    }

    setCurrentVideo = (videoUrl) => {
        this.setState({currentVideo: videoUrl})
    }

    componentDidMount(){
        this.loadDetailsPage()
        // window.scrollTo(0, 0)
    }

    // componentDidUpdate = (prevProps, prevState) => prevState.currentVideo !== this.state.currentVideo && window.scrollTo(0, 0)

    toggleShowSections = () => {
        this.setState({showSections: !this.state.showSections})
    }

    // componentDidUpdate(prevProps, prevState){
    //     if( prevState.currentVideo !== this.state.currentVideo){
    //         // this.scrollIntoViewCurrentSection()
    //     }
    // }

    // renderList could be removed --> to inspect
    // renderList = () =>{
    //     this.loadDetailsPage()
    // }

    toggleNewSectionForm = () => {
        this.setState({newSectionFormIsShown: !this.state.newSectionFormIsShown})
    }


    render(){

        return(
            !this.state.course
            ?
            <Spinner size={60}/>
            :
            <>
            <CourseHeader course = {this.state.course}/>
            <Row className="justify-content-around">
                <Col md={7} style={{marginBottom: '1em'}}>
                    <LectureVideo videoUrl={this.state.currentVideo} style={{width:"100%", margin:0, padding:0}}/>
                    <hr/>

                    {/* <p>Pret: <s> {this.state.course.price}$  </s> <strong style={{ color : 'red' }}>  {this.state.course.discountedPrice}$ </strong></p>

                    <hr></hr> */}

                    {/* DE PASTRAT DEOCAMDATA */}
                    {/* <Link to="/courses" className="btn btn-dark">Lista de cursuri</Link> */}
                    {/* <button className="btn btn-dark" onClick={this.toggleShowSections} style={{ marginLeft: '20px' }}>
                        {this.state.showSections ? 'Ascunde cuprins' : 'Arata cuprins'}                        
                    </button> */}

                    {/* {!this.state.course.sections || (this.state.course?.sections.length === 1 && this.state.course.sections[0]==='')
                    ?
                    <>
                    <p>Todavia no hay sections...</p>
                    </>
                    :
                    null
                    } */}

                    <CourseTabs course={this.state.course} loggedUser={this.props.loggedUser} renderList={this.renderList}
                        setCurrentVideo={this.setCurrentVideo}/>

                </Col>

                <Col md={4}>
                    {/* <img src={this.state.course.image} alt={this.state.course.name} style={{ width: '100%' }} /> */}
                    {(!this.state.course.sections || this.state.course?.sections.length === 0)
                    ?
                    <>
                        <p>Todavia no hay sections...</p>
                        {
                            ( this.props.loggedUser?.role === 'admin' || this.state.course?.authors.includes(this.props.loggedUser?._id) ) &&
                            <div className={classes.block}>
        
                                <button className="btn btn-dark" onClick={this.toggleNewSectionForm}>
                                    Adauga Sectiune                     
                                </button>            
                            </div>
                        }
                        {
                            this.state.newSectionFormIsShown && 
                            <SectionForm courseId={this.state.course._id} hideForm={this.toggleNewSectionForm} renderList={this.renderList}/>
                        }
                    </>
                    
                    :
                    <>
                    {
                        this.props.loggedUser?.role === 'admin' || this.props.loggedUser?.courses.includes(this.state.course._id)
                        ?
                        <h5>Continutul cursului:</h5>
                        :
                        <h5>Continut cu acces liber:</h5>
                    }
                    {/* <CourseHeader course={{name: 'Continut cu acces liber:'}}/> */}
                    <SectionsList courseId={this.state.course._id} 
                        freeCourse={this.state.course.freeAccessForAllLectures} 
                        lecturesCount={this.state.course.lectures.length} 
                        sections={this.state.course?.sections}  
                        loggedUser={this.props.loggedUser} 
                        renderList={this.renderList} 
                        currentLecture={this.state.currentLecture} setCurrentSectionAndLecture={this.setCurrentLecture}
                        currentSection={this.state.currentSection}
                        setCurrentVideo={this.setCurrentVideo}
                        currentVideo={this.state.currentVideo}/>
                    </>
                    }
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