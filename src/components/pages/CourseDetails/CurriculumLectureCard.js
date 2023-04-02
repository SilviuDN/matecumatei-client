import { Container} from "react-bootstrap"
// import LectureModal from '../LecturePage/LectureModal'
import CurriculumLectureModal from "./CurriculumLectureModal";
import classes from './CurriculumLecturePage.module.css';

// import PlayLecture from '../SectionPage/play-svgrepo-com.svg'
// import AddLecture from '../SectionPage/add-to-svgrepo-com.svg'
// import EditLecture from '../SectionPage/edit-svgrepo-com.svg'
import FreeAccess from '../SectionPage/duotone-eye-open-svgrepo-com.svg'
import RestrictedAccess from '../SectionPage/duotone-eye-closed-svgrepo-com.svg'

import LecturesService from '../../../services/lectures.services';
import { Component } from 'react';

class CurriculumLectureCard extends Component{
    constructor(){
        super()
        this.state = {
            showVideoInModal: false,
            // freeAccess could be removed
            freeAccess: false,
            lecture: undefined
        }
        this.lecturesService = new LecturesService()
    }

    toggleShowLecture = () => {
        this.setState({
            showVideoInModal: !this.state.showVideoInModal
        })
    }

    toggleLectureAccess = () => {
        const lectureInput = {_id: this.state.lecture._id, freeAccess: !this.state.freeAccess}
        this.lecturesService
            .editLecture(lectureInput)
            .then(res => console.log('toggled'))
            .catch(err => console.log(err))
        const tempLectureObject = {...this.state.lecture, freeAccess: !this.state.freeAccess}
        this.setState({
            lecture: tempLectureObject,
            freeAccess: !this.state.freeAccess
        })
        this.props.refreshSectionsList()

    }


    loadLectureCard = () => {
        const {lecture} = this.props
        this.lecturesService
            .getLecture(lecture._id)
            .then(res => this.setState({lecture: res.data, freeAccess:res.data.freeAccess}))
            .catch( err => console.log(err))

    }

    componentDidMount(){
        this.loadLectureCard()
    }

    componentDidUpdate = (prevProps, prevState) => prevState.freeAccess !== this.state.freeAccess && this.loadLectureCard()


    render(){
        const {lecture, loggedUser, currentVideo} = this.props
        // am renuntat la unele variabile definite dar nefolosite
        // const {lecture, loggedUser, hideForm, renderList, currentVideo, setCurrentVideo, setCurrentLecture} = this.props
        
        // let visibilityCondition = loggedUser || ( !loggedUser && ( lecture.freeAccess ? 'flex' : 'none' ) )
        //loggedUser && this.state.section?.sectionNumber < this.props.currentSection ? 'none' : 'flex'
        // const visibilityCondition = {display: visibilityCondition}

        const setCurrentVideoSectionAndLecture = () => {
            // setCurrentVideo(lecture.videoUrl)
            // setCurrentLecture(lecture.sectionNumber, lecture.lectureNumber)
        }
        const activeColor = currentVideo === lecture.videoUrl ? '#ebe8e8' : '#fff'
        return(
            <>
                <Container className={classes.container} onClick={setCurrentVideoSectionAndLecture}
                    style={{background: activeColor}}
                    id={`clecture${lecture.lectureNumber}`}>

                    <div className={classes.block}  style={{width: '70%'}}>
                        <h5 style={{ marginBottom: '0px', fontSize:'1em'}}>{lecture.sectionNumber}.{lecture.lectureNumber} - {lecture.name}</h5 >
                    </div>

                    {
                    loggedUser
                    ?
                    null
                    :
                    <div className={classes.block}>
                        <div className={classes.smallPicContainer} onClick={this.state.freeAccess ? this.toggleShowLecture : null}> 
                            <img className={classes.smallPic} src={this.state.freeAccess ? FreeAccess : RestrictedAccess} alt="play lecture"/>
                        </div>    
                    </div>
                    }

                {/* {
                    loggedUser?.role !== 'admin'
                    ?
                    null
                    :
                    <div className={classes.block} onClick={this.toggleLectureAccess}>           
                        <div className={classes.smallPicContainer}>
                            <img className={classes.smallPic} src={this.state.freeAccess ? FreeAccess : RestrictedAccess} alt="play lecture"/>
                        </div>
                    </div>
                } */}

                {/* {
                    !this.showVideoInModal && loggedUser?.role === 'admin' &&
                    <>
                    <div className={classes.block}>            
                        <div className={classes.smallPicContainer}>
                            <img className={classes.smallPic} src={EditLecture} alt="edit lecture"/>
                        </div>
                    </div>

                    <div className={classes.block}>            
                        <div className={classes.smallPicContainer} onClick={hideForm}>
                            <img className={classes.smallPic} src={AddLecture} alt="add lecture"/>
                        </div>
                    </div>
                    </>
                } */}

                </Container>

                {
                    this.state.showVideoInModal
                    &&
                    <CurriculumLectureModal videoUrl = {lecture.videoUrl} toggleShowLecture={this.toggleShowLecture} showLecture={this.state.showVideoInModal} />

                    // <iframe width="560" height="315" src={lecture.videoUrl}
                    //     title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    //     allowfullscreen="allowfullscreen">
                    // </iframe>
                }
            </>
        )
    }
}




export default CurriculumLectureCard