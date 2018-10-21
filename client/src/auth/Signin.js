import React, {Component} from 'react'
import {Panel, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import auth from './auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'
import "./Signin.css";

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  }

componentDidUpdate(){
 
}

validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 
    );
  }

  clickSubmit = () => {
   
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    
    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})

          
        })
      }
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {

    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    let ErrorPanel=''
    if (this.state.error) ErrorPanel = (<Panel.Footer><span className="glyphicon glyphicon-exclamation-sign"></span> <span>{this.state.error}</span></Panel.Footer>); else ErrorPanel=null

  return (

      <div className="Signin">
      <Panel>
        <Panel.Heading>Sign In</Panel.Heading>
      <form>
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
         
          
        <Button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          onClick={this.clickSubmit}>Sign In</Button>
      </form>
      {ErrorPanel}
      </Panel>
     


                                  
      
</div>
    )
  }
}

export default Signin
