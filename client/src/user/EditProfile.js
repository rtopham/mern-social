import React, {Component} from 'react'
import {Image, Panel, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import "./EditProfile.css"
//import avatar from './placeholder.jpg' 

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      about: '',
      photo: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirectToProfile: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    this.userData = new FormData()
    const jwt = auth.isAuthenticated()
    read({
      userId: this.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({name: data.name, about:data.about, email: data.email})
      }
    })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.state.name || undefined,
      about: this.state.about || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, this.userData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'redirectToProfile': true})
      }
    })
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
      
    });
  }

  handleChangePhoto = event => {
    this.userData.set(event.target.id, event.target.files[0])
    this.setState({
      [event.target.id]: event.target.files[0]
      
    });
    console.log(event.target.id)
    console.log(event.target.files[0])
  }

  render() {

    const photoUrl = this.match.params.userId
                 ? `/api/users/photo/${this.match.params.userId}?${new Date().getTime()}`
                 : '/api/users/defaultphoto'

//const photoUrl = `/api/users/photo/${this.match.params.userId}?${new Date().getTime()}`
                 



    if (this.state.redirectToProfile) {
      return (<Redirect to={'/user/' + this.match.params.userId}/>)
    }
    return (
      <div className="EditProfile">
      <Panel>
        <Panel.Heading>Edit Profile</Panel.Heading>
        <div className="EditProfileImage">
        <Image src={photoUrl} responsive rounded />
        </div>
      <form>
      
      <FormGroup controlId="photo" bsSize="large">
      <ControlLabel>Upload File</ControlLabel>
      <FormControl
      
      type="file"
      label="File"
      onChange={this.handleChangePhoto}
      
      />
    </FormGroup>
    
      <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
      </FormGroup>
      <FormGroup controlId="about" bsSize="large">
          <ControlLabel>About</ControlLabel>
          <FormControl
            componentClass="textarea"
            type="name"
            value={this.state.about}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          onClick={this.clickSubmit}>Submit</Button>
      </form>
      </Panel>
      </div>
    )
  }
}


export default EditProfile
