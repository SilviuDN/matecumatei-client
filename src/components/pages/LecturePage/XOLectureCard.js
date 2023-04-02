import {useState} from 'react'
import { Container} from "react-bootstrap"
import LectureModal from './LectureModal'
import classes from './LecturePage.module.css';


const LectureCard = ({lecture, loggedUser, hideForm, renderList}) => {


    const [showLecture, setShowLecture] = useState(false)

    const toggleShowLecture = (prevState) => {
        setShowLecture(!showLecture)
    }


    return(
<>
            {/* <article className="courseCard"> */}
                <Container className={classes.container}>
                    <div className={classes.block}  style={{width: '70%'}}>
                        <h5 style={{ marginBottom: '0px'}}>{lecture.sectionNumber}.{lecture.lectureNumber} - {lecture.name}</h5 >
                    </div>
                    
                    <div>
                       <button className="btn btn-dark" onClick={toggleShowLecture}>
                            {showLecture ? 'Ascunde lectia' : 'Arata lectia'}                        
                        </button>                    
                    </div>

                    {
                        !showLecture && loggedUser?.role === 'admin' &&
                        <>
                        <div className={classes.block}>
                            <button className="btn btn-dark">
                                Editeaza Lectie                     
                            </button>                  
                        </div>
                        <div className={classes.block}>
                            <button className="btn btn-dark" onClick={hideForm}>
                                Adauga Lectie                     
                            </button>                  
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