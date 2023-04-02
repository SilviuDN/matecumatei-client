import { useState } from 'react'
import { Form, Button, Container, ListGroup, Row, Col } from 'react-bootstrap'
// import { Form, Button, Container, ListGroup, Row, Col, InputGroup } from 'react-bootstrap'
import CoursesService from '../../../services/courses.services'
import UploadsService from '../../../services/uploads.service'

const CourseForm = (props) =>  {

    const [courseInput, setCourseInput] = useState({
            name: '',
            description: '',
            typeOfCourse: '',
            position: '',
            tags: [],
            price: '',
            discountedPrice: '',
            skillLevel: 'mediu',
            language: 'română',
            allPlatformPromotions: [],
            freeAccessForAllLectures: true,
            image: '',
            owner: props.loggedUser?._id,
            authors: [props.loggedUser?._id],
            temporaryTag: '',
            addTagEnabled: true,
    })

    const coursesService = new CoursesService()
    const uploadsService = new UploadsService()

    const handleInputChange = e => {
        const { name, value } = e.target

        // React SCHEDULES state updates, does not perform them instantly ==> if more updates scheduled, wrong state might be used
        // INSTEAD OF:

        // setCourseInput({
        //     ...courseInput,
        //     [name]: value
        // })

        // WE USE:

        setCourseInput((prevCourseInput) => {
            return { ...prevCourseInput, [name]: value }
        } )

        // and React GUARANTEES the latest state will be used

        // IF STATE UPDATE DEPENDS ON THE PREVIOUS STATE, USE THE ARROW FUNCTION
    }

    const addTag = (e) => {
        e.preventDefault()

        const tempTags = [...courseInput.tags, courseInput.temporaryTag]
        setCourseInput((prevCourseInput) => {
            return { ...prevCourseInput, tags: tempTags, temporaryTag: ''  }
        } )


    }


    const handleFormSubmit = e => {
        e.preventDefault()
        // console.log(courseInput)

        coursesService
            .saveCourse(courseInput)
            .then(() => {
                // this.props.closeModal()
                // this.props.refreshCoasters()
                setCourseInput({
                    name: '',
                    description: '',
                    about: '',
                    temporaryTag: '',
                    tags: [],
                    typeOfCourse: '',
                    position: '',
                    price: '',
                    discountedPrice: '',
                    skillLevel: 'mediu',
                    language: 'română',
                    allPlatformPromotions: [],
                    freeAccessForAllLectures: false,
                    image: '',
                    owner:'',
                    authors:[],
                    addTagEnabled: true,
                })
                props.history.push('/courses')
            })
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        // this.setState({ loading: true })

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadsService
            .uploadImage(uploadData)
            .then(response => {
                setCourseInput((prevCourseInput) => {
                return { ...prevCourseInput, image: response.data.cloudinary_url }
            } )
                // this.setState({
                //     loading: false,
                //     coaster: { ...this.state.coaster, imageUrl: response.data.cloudinary_url }
                // })
            })
            .catch(err => console.log(err))
    }

        return (
            <Container>

                <Form onSubmit={handleFormSubmit}>

                    <Form.Group controlId="name">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={courseInput.name} onChange={handleInputChange} name="name" />
                    </Form.Group>

<Form.Group controlId="about">
    <Form.Label>About</Form.Label>
    <Form.Control type="text" value={courseInput.about} onChange={handleInputChange} name="about" />
</Form.Group>

<Row>
    <Col>
        <Form.Group controlId="temporaryTag">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" value={courseInput.temporaryTag} onChange={handleInputChange} name="temporaryTag" />
        </Form.Group>
    </Col>
    <Col>
        <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" onClick={addTag} disabled = {!courseInput.addTagEnabled}>
            Add tag
        </Button>
    </Col>
    <Col>
        <ListGroup horizontal>
            {courseInput.tags.map( tag => <ListGroup.Item>{tag}</ListGroup.Item>)}
        </ListGroup>
    </Col>
</Row>

{/* <InputGroup className="mb-3">
    <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={handleCheckboxChange} name="freeAccessForAllLectures"/>
</InputGroup>
<InputGroup className="mb-3">
    <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={handleCheckboxChange} name="allPlatformPromotions" />
</InputGroup> */}

                    <Form.Group controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={courseInput.description} onChange={handleInputChange} name="description" />
                    </Form.Group>

                    <Form.Group controlId="inve">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" value={courseInput.typeOfCourse} onChange={handleInputChange} name="typeOfCourse" />
                    </Form.Group>

                    <Form.Group controlId="lng">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="text" value={courseInput.position} onChange={handleInputChange} name="position" />
                    </Form.Group>

                    <Form.Group controlId="lng">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={courseInput.price} onChange={handleInputChange} name="price" />
                    </Form.Group>

                    <Form.Group controlId="lng">
                        <Form.Label>Discounted Price</Form.Label>
                        <Form.Control type="text" value={courseInput.discountedPrice} onChange={handleInputChange} name="discountedPrice" />
                    </Form.Group>

                    {/* <Form.Group controlId="lng">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" value={courseInput.image} onChange={handleInputChange} name="image" />
                    </Form.Group> */}

                    <Form.Group controlId="lng">
                        <Form.Label>Image (file) </Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>

                    <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit">Create course</Button>

                </Form>

            </Container>
        )

}

export default CourseForm