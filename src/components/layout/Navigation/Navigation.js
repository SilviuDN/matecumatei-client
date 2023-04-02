import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navigation.css'

import AuthService from '../../../services/auth.services'

const Navigation = ({ storeUser , loggedUser, handleAlert}) => {

    const authService = new AuthService()

    const logout = () => {
        authService
            .logout()
            .then(() => {
                storeUser(undefined)
                handleAlert([`You've just logged out. Goodbye!`], 3000, 'info')
            })
            .catch(err => console.log(err))
    }


    return (
        // ADDITIONAL_INFO
        // as putea adauga zIndex:10 --> ca sa nu mai apara video peste Navbar
        <Navbar bg="dark" variant="dark" expand="md" style={{ marginBottom: '0px', position: 'fixed', top: 0, width:'100%', zIndex:10 }}>
            <Link className="nav-link" to="/">
                <Navbar.Brand style={{color: 'rgba(255, 255, 255, 0.55)'}}>MateCuMatei</Navbar.Brand >
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/courses">Courses</Link>

                    {loggedUser && ( loggedUser.role === 'admin' || loggedUser.role === 'superUser' )
                    ?
                    <Link className="nav-link" to="/courses/new">NewCourse</Link>
                    :
                    null                    
                    }
                
                    {!loggedUser
                        ?
                        <>
                            <Link className="nav-link" to="/signup">SignUp</Link>
                            <Link className="nav-link" to="/login">LogIn</Link>
                        </>
                        :
                        <>
                            <span className="nav-link" onClick = { () => logout()}>LogOut</span>
                            <span className="nav-link" >Salutare{loggedUser ? ', '+loggedUser.username.trim().split(' ')[0] : ''}!</span>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Navigation