import { Component } from "react"
import UsersService from "../../../services/users.services"
import Spinner from "../../shared/Spinner"

class InstructorCard extends Component {

    constructor(){
        super()
        this.state = {
            author: undefined
        }
        this.userService = new UsersService()
    }

    loadInstructor = () => {
        const {instructorId} = this.props
        this.userService
            .getUser(instructorId)
            .then( res => this.setState({author: res.data}))
    }

    componentDidMount(){
        this.loadInstructor()
    }

    render(){
        return (
            !this.state.author 
            ?
            <Spinner size={60}/>
            :
            <>
                <h2>{this.state.author.name} {this.state.author.surname}</h2>
                <p>Despre mine:</p>
                {
                    this.state.author.description.map( (paragraph, keyNum) => <p key={keyNum}>{paragraph}</p>)
                }
            </>
          )
    }


  }
  export default InstructorCard