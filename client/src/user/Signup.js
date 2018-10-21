import React, {Component} from 'react'
import {Panel, Modal, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import {create} from './api-user.js'
//import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import "./Signup.css";

class Signup extends Component {
  constructor(props, context) {
    super(props, context);

  this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      show: false,
      error: ''
  }

  
  this.handleClose = this.handleClose.bind(this);
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

  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', show: true})
      }
    })
  }

  handleClose() {
    this.setState({ show: false });
  }  

  render() {
    let ErrorPanel=''
    if (this.state.error) ErrorPanel = (<Panel.Footer><span className="glyphicon glyphicon-exclamation-sign"></span> <span>{this.state.error}</span></Panel.Footer>); else ErrorPanel=null
    return (
      <div className="Signup">
      <Panel>
        <Panel.Heading>Sign Up</Panel.Heading>
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
          onClick={this.clickSubmit}>Sign Up</Button>
      </form>
      {ErrorPanel}
      </Panel>
      <Modal show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>New account successfully created.</h4>
        </Modal.Body>
        <Modal.Footer>
          <LinkContainer to="/signin">
            <Button color="primary" onClick={this.handleClose} autoFocus="autoFocus">
              Sign In
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
      
      </div>
    )
  }
}

export default Signup
