import LectureCard from "./LectureCard";

const LecturesList = ({lectures, freeCourse, lecturesCount, loggedUser, hideForm, renderList, currentVideo, setCurrentVideo, setCurrentLecture, refreshSectionsList}) => {

    return(
        // <h1>LecturesList</h1>
        <>
        {lectures.map(lecture => <LectureCard lecture = {lecture}  loggedUser={loggedUser}  
            hideForm={hideForm} renderList={renderList} key={lecture._id}
            currentVideo={currentVideo} setCurrentVideo={setCurrentVideo}
            setCurrentLecture={setCurrentLecture}
            refreshSectionsList={refreshSectionsList}
            freeCourse ={freeCourse} lecturesCount={lecturesCount}/>)}
        
        </>
    )

}

export default LecturesList