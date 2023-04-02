import { Container} from "react-bootstrap"
import LectureModal from './LectureModal'
import classes from './LecturePage.module.css';

import PlayLecture from '../SectionPage/play-svgrepo-com.svg'
import AddLecture from '../SectionPage/add-to-svgrepo-com.svg'
import DeleteLecture from '../SectionPage/delete-svgrepo-com.svg'
import EditLecture from '../SectionPage/edit-svgrepo-com.svg'
import FreeAccess from '../SectionPage/duotone-eye-open-svgrepo-com.svg'
import RestrictedAccess from '../SectionPage/duotone-eye-closed-svgrepo-com.svg'

import LecturesService from '../../../services/lectures.services';
import { Component } from 'react';

class LectureCard extends Component{
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
            showVideoInModal: !this.showVideoInModal
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

    deleteLecture = () => {
        this.lecturesService
            .deleteLecture(this.state.lecture._id)
            .then(lecture => console.log(lecture))
            .catch(err => console.log(err))
    }

    componentDidMount(){
        this.loadLectureCard()
    }

    componentDidUpdate = (prevProps, prevState) => prevState.freeAccess !== this.state.freeAccess && this.loadLectureCard()


    render(){
        const {lecture, freeCourse, lecturesCount, loggedUser, hideForm, currentVideo, setCurrentVideo, setCurrentLecture} = this.props
        // const {lecture, freeCourse, lecturesCount, loggedUser, hideForm, renderList, currentVideo, setCurrentVideo, setCurrentLecture, deleteLecture} = this.props
        
        let visibilityCondition = 
            loggedUser?.role === 'admin' ||
            lecture.freeAccess || 
            ( loggedUser && freeCourse ) ||
            ( !loggedUser && freeCourse && 
                ( lecture.lectureNumber < lecturesCount/3
                ?
                'flex' 
                : 
                'none'
                )
            )

        // let visibilityCondition = loggedUser || !loggedUser && lecture.freeAccess ? 'flex' : 'none'

        const setCurrentVideoSectionAndLecture = () => {
            setCurrentVideo(lecture.videoUrl)
            setCurrentLecture(lecture.sectionNumber, lecture.lectureNumber)
        }
        const activeColor = currentVideo === lecture.videoUrl ? '#ebe8e8' : '#fff'
        return(
            <>
                <Container className={classes.container} onClick={setCurrentVideoSectionAndLecture}
                    style={{background: activeColor, display: visibilityCondition}}
                    id={`lecture${lecture.lectureNumber}`}>

                    <div className={classes.block}  style={{width: '70%'}}>
                        <h5 style={{ marginBottom: '0px', fontSize:'1em'}}>{lecture.sectionNumber}.{lecture.lectureNumber} - {lecture.name}</h5 >
                    </div>

                    {
                    loggedUser
                    ?
                    null
                    :
                    <div className={classes.block}>            
                        <div className={classes.smallPicContainer} onClick={this.toggleShowLecture}> 
                            <img className={classes.smallPic} src={PlayLecture} alt="play lecture"/>
                        </div>    
                    </div>
                    }

                {
                    loggedUser?.role !== 'admin'
                    ?
                    null
                    :
                    <div className={classes.block} onClick={this.toggleLectureAccess}>           
                        <div className={classes.smallPicContainer}>
                            <img className={classes.smallPic} src={this.state.freeAccess ? FreeAccess : RestrictedAccess} alt="play lecture"/>
                        </div>
                    </div>
                }
                    {
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

                        <div className={classes.block}>            
                            <div className={classes.smallPicContainer} onClick={this.deleteLecture}>
                                <img className={classes.smallPic} src={DeleteLecture} alt="delete lecture"/>
                            </div>
                        </div>
                        </>
                    }

                </Container>

                {
                    this.showVideoInModal
                    &&
                    <LectureModal videoUrl = {lecture.videoUrl} toggleShowLecture={this.showVideoInModal} showLecture={this.showVideoInModal} />

                    // <iframe width="560" height="315" src={lecture.videoUrl}
                    //     title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    //     allowfullscreen="allowfullscreen">
                    // </iframe>
                }
            {/* </article> */}
            </>
        )
    }
}




export default LectureCard