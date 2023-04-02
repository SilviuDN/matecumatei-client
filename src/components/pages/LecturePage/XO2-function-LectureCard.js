import {useState} from 'react'
import { Container} from "react-bootstrap"
import LectureModal from './LectureModal'
import classes from './LecturePage.module.css';

import PlayLecture from '../SectionPage/play-svgrepo-com.svg'
import AddLecture from '../SectionPage/add-to-svgrepo-com.svg'
import EditLecture from '../SectionPage/edit-svgrepo-com.svg'
import FreeAccess from '../SectionPage/duotone-eye-open-svgrepo-com.svg'
import RestrictedAccess from '../SectionPage/duotone-eye-closed-svgrepo-com.svg'

import LecturesService from '../../../services/lectures.services';


const LectureCard = ({lecture, loggedUser, hideForm, renderList, currentVideo, setCurrentVideo, setCurrentLecture}) => {


    const [showLecture, setShowLecture] = useState(false)

    const toggleShowLecture = (prevState) => {
        setShowLecture(!showLecture)
    }

    const [freeAccess, setVisibility] = useState(lecture.FreeAccess)
    // const toggleVisibility = (prevState) => {
    //     setVisibility(!freeAccess)
    // }

    const lecturesService = new LecturesService()
    const toggleLectureAccess = (prevState) => {
        setVisibility(!freeAccess)
        const lectureInput = {_id: lecture._id, freeAccess: !lecture.freeAccess}
        lecturesService
            .editLecture(lectureInput)
            .then(console.log(`Let's make this possible! - Free access for lecture ${lecture.sectionNumber}.${lecture.lectureNumber}.`))
            // .then(console.log(`Let's make this possible! - Free access for lecture ${lecture.sectionNumber}.${lecture.lectureNumber}.`))
            .catch(err => console.log(err))
    }

    const setCurrentVideoSectionAndLecture = () => {
        setCurrentVideo(lecture.videoUrl)
        setCurrentLecture(lecture.sectionNumber, lecture.lectureNumber)
    }

    const activeColor = currentVideo === lecture.videoUrl ? '#ebe8e8' : '#fff'


    return(
<>
            {/* <article className="courseCard"> */}
                <Container className={classes.container} onClick={setCurrentVideoSectionAndLecture}
                    style={{background: activeColor}}
                    id={`lecture${lecture.lectureNumber}`}>
                {/* <Container className={classes.container} onClick={setCurrentVideo(lecture.videoUrl)}> */}
                    <div className={classes.block}  style={{width: '70%'}}>
                        <h5 style={{ marginBottom: '0px', fontSize:'1em'}}>{lecture.sectionNumber}.{lecture.lectureNumber} - {lecture.name}</h5 >
                    </div>

                    {
                    loggedUser
                    ?
                    null
                    :
                    <div className={classes.block}>            
                        <div className={classes.smallPicContainer} onClick={toggleShowLecture}>
                            <img className={classes.smallPic} src={PlayLecture} alt="play lecture"/>
                        </div>    
                    </div>
                    }

                {
                    loggedUser?.role !== 'admin'
                    ?
                    null
                    :
                    <div className={classes.block} onClick={toggleLectureAccess}>           
                        <div className={classes.smallPicContainer}>
                            <img className={classes.smallPic} src={lecture.freeAccess ? FreeAccess : RestrictedAccess} alt="play lecture"/>
                        </div>
                    </div>
                }
                    {
                        !showLecture && loggedUser?.role === 'admin' &&
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
                    }

                </Container>

                {
                    showLecture
                    &&
                    <LectureModal videoUrl = {lecture.videoUrl} toggleShowLecture={toggleShowLecture} showLecture={showLecture} />

                    // <iframe width="560" height="315" src={lecture.videoUrl}
                    //     title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    //     allowfullscreen="allowfullscreen">
                    // </iframe>
                }
            {/* </article> */}
            </>




    )

}

export default LectureCard