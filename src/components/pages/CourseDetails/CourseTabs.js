import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
// import Curriculum from './Curriculum'
import InstructorCard from '../InstructorDetails/InstructorCard'
import Overview from './Overview'
import Reviews from './Reviews'
import Curriculum from './Curriculum'
// import SectionsList from '../SectionPage/SectionsList'


//WORKAROUND daca o transform in componenta de clasa si in stare definesc defaultActiveKey = 'nimic', pot inactiva taburile cand vizualizez lectiile si 
//rezolv problema cu scrollUp
function CourseTabs({course, loggedUser, renderList, setCurrentVideo}) {
  return (
    <Tabs
      // defaultActiveKey={'t'}
      defaultActiveKey={loggedUser ? "overview" : "curriculum"}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {/* // Plan de curs apare doar daca userul nu are cont */}
      {
      !loggedUser 
      ?
      <Tab eventKey="curriculum" title="Plan de curs">
        <Curriculum courseId={course._id} sections={course?.sections}  
                        loggedUser={loggedUser} renderList={renderList}
                        setCurrentVideo={setCurrentVideo}/>
        {/* <Curriculum course={course}/> */}
      </Tab>
      :
      null
      }
      <Tab eventKey="overview" title="Prezentare generala">
        <Overview course={course}/>
      </Tab>
      <Tab eventKey="instructor" title="Instructor">
        <InstructorCard course={course} instructorId={course.authors[0]}/>
      </Tab>
      <Tab eventKey="reviews" title="Opinii" >
        <Reviews course={course}/>
      </Tab>
    </Tabs>
  )
}

export default CourseTabs