import React from 'react'
import { Container, Row} from 'react-bootstrap';

// import classes from './LectureModal.module.css';

const LectureVideo = props => {

    const {videoUrl} = props

    let containerStyle = {padding: '0'}
    let rowStyle = {padding: '0', margin:'0'}
 

    return(
        <Container fluid style={containerStyle}>
            <Row className="ratio ratio-16x9" style={rowStyle}>
                <iframe src={videoUrl} className='col' frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="01 Structura cursului 6 FEB" >
                </iframe>
            </Row>
        </Container>

    )
}

export default LectureVideo