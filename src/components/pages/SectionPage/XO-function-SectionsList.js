// import { useState } from 'react'
import SectionCard from "./SectionCard";

const SectionsList = ({courseId, sections, loggedUser, renderList, currentLecture, currentSection, setCurrentLecture, currentVideo, setCurrentVideo}) => {

    // const [changedList, setChangedList] = useState(false)


    // const renderList = () =>{
    //     // setChangedList( !changedList  )
    //     setChangedList((prevStatus) => {
    //         return !prevStatus
    //     } )
    // }

    // SCROLL INTO VIEW THE CURRENT SECTION
    const currentSectionID = `section${currentSection}`
    // const currentSectionID = `section${1}`
    // const currentSectionID = `section${2}`
    // const currentSectionID = `section${3}`
    console.log(currentSectionID)

    const element = currentSectionID ? document.getElementById(currentSectionID) : null;
    if (element){
        console.log('heyheyhey')
        element?.scrollIntoView(); 
    }

    return(
        // <h1>LecturesList</h1>
        <div style={{height:'40vh', overflowY:'scroll'}}>
        {sections.map(sectionId => <SectionCard key={sectionId} courseId={courseId} sectionId = {sectionId}  loggedUser={loggedUser} 
            renderList={renderList} 
            currentLecture={currentLecture} currentSection={currentSection} setCurrentLecture={setCurrentLecture}
            currentVideo={currentVideo} setCurrentVideo={setCurrentVideo}/>)}
        {/* {sections.map(sectionId => <SectionCard key={sectionId} courseId={courseId} sectionId = {sectionId}  loggedUser={loggedUser} renderList={renderList}/>)} */}
        
        </div>
    )
}

export default SectionsList


