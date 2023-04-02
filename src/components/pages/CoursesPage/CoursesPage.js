import {Container, Button} from 'react-bootstrap'
import CoursesList from './CoursesList'

import { Link } from 'react-router-dom'

const CoursesPage = ({loggedUser}) => {

    // console.log(loggedUser.role)

    return(
        <Container>
            <CoursesList/>
            {
                loggedUser?.role==='admin' || loggedUser?.role==='superUser'
                ?
                <Link to={`/courses/new`}>
                    <Button className="btnBlock">New Course</Button>
                </Link>
                :
                null
            }

            <p style={{marginBottom: '3rem'}}></p>
        </Container>
    )
}

export default CoursesPage