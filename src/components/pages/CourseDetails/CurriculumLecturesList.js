// import LectureCard from "../LecturePage/LectureCard";
import CurriculumLectureCard from "./CurriculumLectureCard";

const CurriculumLecturesList = ({lectures, loggedUser, hideForm, renderList, currentVideo, setCurrentVideo, setCurrentLecture, refreshSectionsList}) => {

    return(
        // <h1>LecturesList</h1>
        <>
        {lectures.map(lecture => <CurriculumLectureCard lecture = {lecture}  loggedUser={loggedUser}  
            hideForm={hideForm} renderList={renderList} key={lecture._id}
            currentVideo={currentVideo} setCurrentVideo={setCurrentVideo}
            setCurrentLecture={setCurrentLecture}
            refreshSectionsList={refreshSectionsList}/>)}
        
        </>
    )

}

export default CurriculumLecturesList