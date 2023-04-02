import { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Routes from './Routes'
import Navigation from './layout/Navigation/Navigation'
import Footer from './layout/Footer/Footer'
import AuthService from '../services/auth.services'
import Alert from './shared/Alert'

class App extends Component {

  constructor() {
    super()
    this.state = { 
      loggedUser: undefined,
      toast:{
        showAlert: false,
        alertText: [],
        displayTime: 0,
        color: 'warning'
      }
    }
    this.authService = new AuthService()
  }

  storeUser = loggedUser => this.setState({ loggedUser })

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(theLoggedUser => this.storeUser(theLoggedUser.data))
      .catch(() => this.storeUser(undefined))
  }

  handleAlert(alertText, displayTime = 3000, color='warning', showAlert = true) {
    // console.log(alertText, displayTime, color, showAlert)
    this.setState({toast: {...this.state.toast, alertText, displayTime, color, showAlert }})
  }

  componentDidMount = () => {
    this.fetchUser()
    // window.scrollTo(0, 0)
  }

  render() {


    return (
      <>
        <Navigation handleAlert={(alertText, displayTime, color, showAlert) => this.handleAlert(alertText, displayTime, color, showAlert)} 
          storeUser={this.storeUser} loggedUser={this.state.loggedUser} />

        <Routes handleAlert={(alertText, displayTime, color, showAlert) => this.handleAlert(alertText, displayTime, color, showAlert)} 
          storeUser={this.storeUser} loggedUser={this.state.loggedUser} />

        <Footer />
        
        <Alert handleAlert={(alertText, displayTime, color, showAlert) => this.handleAlert(alertText, displayTime, color, showAlert)} 
          show={this.state.toast.showAlert} text={this.state.toast.alertText} 
          displayTime={this.state.toast.displayTime} color={this.state.toast.color}/>
      </>
    )
  }
}

export default App;
