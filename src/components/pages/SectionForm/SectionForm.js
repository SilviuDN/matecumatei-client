import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import SectionsService from '../../../services/sections.services'
// import CoursesService from '../../../services/courses.services'
import Modal from '../../shared/Modal'

const SectionForm = (props) =>  {

    const [sectionInput, setSectionInput] = useState({
            courseId: props.courseId,
            name: '',
            sectionNumber: '',
            description: '',
            authors: [props.loggedUser?._id],
    })

    const sectionsService = new SectionsService()
    // const coursesService = new CoursesService()



    const handleInputChange = e => {
        const { name, value } = e.target

        // React SCHEDULES state updates, does not perform them instantly ==> if more updates scheduled, wrong state might be used
        // INSTEAD OF:

        // setSectionInput({
        //     ...sectionInput,
        //     [name]: value
        // })

        // WE USE:


        setSectionInput((prevSectionInput) => {
            return { ...prevSectionInput, [name]: value }
        } )

        // and React GUARANTEES the latest state will be used

        // IF STATE UPDATE DEPENDS ON THE PREVIOUS STATE, USE THE ARROW FUNCTION
    }


    const handleFormSubmit = e => {
        e.preventDefault()

        // console.log(props.courseId)

        sectionsService
            .saveSection(sectionInput)
            .then((newSection) => {

                setSectionInput({
                    name: '',
                    description: '',
                    sectionNumber: '',
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
                        <Form.Control type="text" value={sectionInput.name} onChange={handleInputChange} name="name" />
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={sectionInput.description} onChange={handleInputChange} name="description" />
                    </Form.Group>

                    <Form.Group controlId="sectionNumber">
                        <Form.Label>Section Number</Form.Label>
                        <Form.Control type="text" value={sectionInput.sectionNumber} onChange={handleInputChange} name="sectionNumber" />
                    </Form.Group>

                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'10%' }} variant="dark" onClick={props.hideForm}>Cancel</Button>
                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'20%' }} variant="dark" type="submit">Create section</Button>

                </Form>

            </Container>
            </Modal>
        )

}

export default SectionForm