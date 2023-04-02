import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import LecturesService from '../../../services/lectures.services'
// import SectionsService from '../../../services/sections.services'
import Modal from '../../shared/Modal'

const LectureForm = (props) =>  {

    const [lectureInput, setLectureInput] = useState({
            sectionId: props.sectionId,
            name: '',
            sectionNumber: props.sectionNumber,
            lectureNumber: '',
            typeOfLecture: '',
            description: '',
            videoUrl: '',
    })

    const lecturesService = new LecturesService()
    // const sectionsService = new SectionsService()



    const handleInputChange = e => {
        const { name, value } = e.target

        setLectureInput((prevLectureInput) => {
            return { ...prevLectureInput, [name]: value }
        } )

    }


    const handleFormSubmit = e => {
        e.preventDefault()

        // console.log(props.courseId)


        lecturesService
            .saveLecture(lectureInput)
            .then((newLecture) => {

                setLectureInput({
                    name: '',
                    sectionNumber: '',
                    lectureNumber: '',
                    typeOfLecture: '',
                    description: '',
                    videoUrl: '',
                })

                props.hideForm()
                props.toggleShowClasses()
                props.renderList()

            })
            .catch(err => console.log(err))

    }


        return (
            <Modal>
            <Container>

                <Form onSubmit={handleFormSubmit}>

                    <Form.Group controlId="name">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={lectureInput.name} onChange={handleInputChange} name="name" />
                    </Form.Group>

                    <Form.Group controlId="lectureNumber">
                        <Form.Label>Lecture Number</Form.Label>
                        <Form.Control type="text" value={lectureInput.lectureNumber} onChange={handleInputChange} name="lectureNumber" />
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={lectureInput.description} onChange={handleInputChange} name="description" />
                    </Form.Group>

                    <Form.Group controlId="typeOfLecture">
                        <Form.Label>Type of Lecture</Form.Label>
                        <Form.Control type="text" value={lectureInput.typeOfLecture} onChange={handleInputChange} name="typeOfLecture" />
                    </Form.Group>

                    <Form.Group controlId="videoUrl">
                        <Form.Label>Video Url</Form.Label>
                        <Form.Control type="text" value={lectureInput.videoUrl} onChange={handleInputChange} name="videoUrl" />
                    </Form.Group>

                <Form.Group controlId="imageUrl">
                    <Form.Label>Imagen (URL)</Form.Label>
                    <Form.Control type="file" onChange={e => this.handleFileUpload(e)} />
                </Form.Group>

                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'10%' }} variant="dark" onClick={props.hideForm}>Cancel</Button>
                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'20%' }} variant="dark" type="submit">Create lecture</Button>


                </Form>

            </Container>
            </Modal>
        )

}

export default LectureForm