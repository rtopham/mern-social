import React, {Component} from 'react'
import {Panel, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import "./EditProfile.css";

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirectToProfile: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    read({
      userId: this.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({name: data.name, email: data.email})
      }
    })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'userId': data._id, 'redirectToProfile': true})
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

  render() {

    if (this.state.redirectToProfile) {
      return (<Redirect to={'/user/' + this.state.userId}/>)
    }
    return (
      <div className="EditProfile">
      <Panel>
        <Panel.Heading>Edit Profile</Panel.Heading>
      <form>
      <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={this.state.name}
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
