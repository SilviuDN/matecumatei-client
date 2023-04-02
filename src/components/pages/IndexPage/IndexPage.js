// import {Container, Button} from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './IndexPage.css'

const IndexPage = () => {

    return (
        <Container className='bgImg' style={{marginLeft: '0px', marginRight: '0px', width:'100vw'}}>

            <h1>Welcome to MateCuMatei</h1>
            <p>Perseverence leads to inspiration</p>
            <Link to={`/courses`}>
                    {/* <Button className="btnBlock">All Courses</Button> */}
            </Link>

        </Container>
        
    )
}

export default IndexPage