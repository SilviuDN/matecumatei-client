import { Component } from "react";
import SectionsService from "../../../services/sections.services";
import LecturesList from "../LecturePage/LecturesList";
import classes from './SectionPage.module.css';
import SectionForm from "../SectionForm/SectionForm";
import LectureForm from "../LectureForm/LectureForm";
import Spinner from './../../shared/Spinner'
import DropDownListArrow from "./DropDownListArrow";
// import PlayLecture from './play-svgrepo-com.svg'
// import AddLecture from './add-to-svgrepo-com.svg'
// import EditLecture from './edit-svgrepo-com.svg'

import { Container} from 'react-bootstrap'
//<SectionCard key={sectionId} courseId={courseId} sectionId = {sectionId}  loggedUser={loggedUser} renderList={renderList}/>

class SectionCard extends Component{

    constructor(){
        super()
        this.state = {
            section: undefined,
            showLectures: false,
            newSectionFormIsShown: false,
            newLectureFormIsShown: false,
        }
        this.sectionService = new SectionsService()
    }

    loadSectionsList = () => {
        const {sectionId} = this.props
        this.sectionService
            .getSection(sectionId)
            .then( res => this.setState({section: res.data}))
            // .then( res => this.setState({section: res.data}))
            .catch( err => console.log(err))
    }

    componentDidMount(){
        this.loadSectionsList()
    }

    toggleShowLectures = () => {
        // ADDITIONAL_INFO 
        // doar cand desfasor lista cu lectures pt o noua sectiune, capul de sectiune se aliniaza, facand lectures vizibile
        // cand ascund lista de lectures nu centrez
        !this.state.showLectures && this.props.setCurrentSection(this.state.section.sectionNumber)
        this.setState({showLectures: !this.state.showLectures})
    }

    toggleNewSectionForm = () => {
        this.setState({newSectionFormIsShown: !this.state.newSectionFormIsShown})
    }

    toggleNewLectureForm = () => {
        this.setState({newLectureFormIsShown: !this.state.newLectureFormIsShown})
    }

    componentDidUpdate = (prevProps, prevState) => prevState.newSectionFormIsShown !== this.state.newSectionFormIsShown && this.loadSectionsList()


    render(){

        return(
            !this.state.section
            ?
            // <h4>waiting3...</h4>
            <Spinner size={60}/>
            :
            <>


                <Container className={classes.sectionContainer} id={`section${this.state.section.sectionNumber}`}>

                    <div className={classes.sectionTitleContainer}>

                        <div className={classes.block} style={{width: '70%'}}>
                            <h5 style={{ marginBottom: '0px'}}>{this.state.section.sectionNumber} - {this.state.section.name}</h5 >
                        </div>

                        <DropDownListArrow toggleShowLectures={this.toggleShowLectures} showLectures={this.state.showLectures}  />
                        
                    </div>


                    {
                        this.state.showLectures &&  
                        <LecturesList sectionId={this.state.section._id} lectures={this.state.section.lectures}  loggedUser={this.props.loggedUser}
                             hideForm={this.toggleNewLectureForm} renderList={this.props.renderList} 
                             currentVideo={this.props.currentVideo} setCurrentVideo={this.props.setCurrentVideo}
                             setCurrentLecture={this.props.setCurrentLecture}
                             refreshSectionsList={this.props.refreshSectionsList}
                             freeCourse={this.props.freeCourse} lecturesCount={this.props.lecturesCount}/>
                    }

                    {
                        this.state.showLectures && this.props.loggedUser?.role === 'admin' && this.state.section.lectures.length === 0 &&

                        <div className={classes.block}>     
                            <button className="btn btn-dark" onClick={this.toggleNewLectureForm}>
                                Adauga Lectie                     
                            </button>            
                        </div>
                    }


                    {
                        this.state.showLectures && this.props.loggedUser?.role === 'admin' &&
                        <div className={classes.block}>
     
                            <button className="btn btn-dark" onClick={this.toggleNewSectionForm}>
                                Adauga Sectiune                     
                            </button>            
                        </div>
                    }
                    

                </Container >

                {this.state.newSectionFormIsShown && 
                <SectionForm courseId={this.props.courseId} hideForm={this.toggleNewSectionForm} renderList={this.props.renderList}
                    toggleShowLectures={this.toggleShowLectures} loggedUser={this.props.loggedUser}/>}

                {this.state.newLectureFormIsShown && 
                <LectureForm courseId={this.props.courseId} sectionId={this.state.section?._id} sectionNumber={this.state.section?.sectionNumber} 
                    hideForm={this.toggleNewLectureForm} renderList={this.props.renderList}
                    toggleShowLectures={this.toggleShowLectures} loggedUser={this.props.loggedUser}/>}



            
            </>

        )
    }

}

export default SectionCard


            // <Row className="justify-content-around">
            //     <Col md={6}>
            //         <h1>{this.state.section.name}</h1>
            //         <p>{this.state.section.description}</p>

            //         <hr></hr>

                    
            //         {/* <Link to="/courses" className="btn btn-dark">Lista de cursuri</Link> */}
            //         <button className="btn btn-dark" onClick={this.toggleShowLectures} style={{ marginLeft: '20px' }}>
            //             {this.state.showLectures ? 'Ascunde cuprins' : 'Arata cuprins'}                        
            //         </button>

            //     </Col>

            // </Row>