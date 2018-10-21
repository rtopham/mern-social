import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-user.js'
import {Redirect} from 'react-router-dom'
import DeleteProfileModal from './DeleteProfileModal'

class DeleteUser extends Component {

  state = {
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  deleteAccount = () => {

    const jwt = auth.isAuthenticated()
    remove({
      userId: this.props.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        auth.signout(() => console.log('deleted'))
        this.setState({redirect: true})
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/'/>
    }

    if (this.state.open){
      return <DeleteProfileModal handleRequestClose={this.handleRequestClose} handleDelete={this.deleteAccount}/>
    }
    else return (
     
      <Button bsStyle="link" bsSize="xsmall" onClick={this.clickButton}><span className="glyphicon glyphicon-trash pull-right" aria-label="Delete" aria-hidden="true" > </span></Button>
      
    )

  }
}

export default DeleteUser
