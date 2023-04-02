import { Toast } from "react-bootstrap"

import logo from './logo.png'

const Alert = ({ handleAlert, show, text, displayTime, color }) => {

   const errorMessages = text.map(errorMessage => <p>{errorMessage}</p>)

    return (
        <Toast bg={color} autohide delay={displayTime} show={show} onClose={() => handleAlert([''], 0, 'warning', false)} 
            style={{ zIndex: 9999, position: 'fixed', bottom: 38, right: 17, width: 300 }}>
            <Toast.Header closeButton={true} closeLabel=''>
                <img
                    src={logo}
                    className="rounded mr-2"
                    alt="Logotipo"
                    style={{ width: '2.5em', height: '2.5em' }}
                />
                <strong className="me-auto"> Mensaje del sistema</strong>
            </Toast.Header>
            <Toast.Body>{errorMessages}</Toast.Body>
        </Toast>
    )
}


export default Alert