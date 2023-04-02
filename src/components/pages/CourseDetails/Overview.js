// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'

function Overview({course}) {
  
  return (
    <>
        <h2>Prezentare generala:</h2>
        <h4>About this course:</h4>
        <hr/>
        <h4>Numbers:</h4>
        <ul>
            <li>Skill level: {course.skillLevel}</li>
            <li>Students: {course.students.length}</li>
            <li>Language: {course.language}</li>
            <li>Lectures: {course.lecturesNumber}</li>
            <li>Total video duration: {course.totalTimeInSeconds}</li>
        </ul>
        <hr/>
        <h4>Description:</h4>
        <p>{course.description}</p>
        <ul>
            <li>Highlights</li>
            <li>What you get</li>
            <li>What you'll learn</li>
            <li>Course requirements / prerequisites</li>
            <li>Who this course is for</li>
        </ul>
        <hr/>
    </>
  )
}
export default Overview