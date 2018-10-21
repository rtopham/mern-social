import React, {Component} from 'react'
import {Panel, ListGroup, Button, ListGroupItem} from "react-bootstrap"
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import "./Profile.css"

class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      redirectToSignin: false
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
      }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }
  render() {

    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="Profile">
      <Panel>
        <Panel.Heading>User Profile</Panel.Heading>
        <Panel.Body>
        <div>
        <ListGroup>
          <ListGroupItem header={this.state.user.name}>{this.state.user.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroupItem>
        </ListGroup>
      </div>
      <div>
        <span className="pull-right">
          {auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id &&(<span className="pull-right">
          <LinkContainer to={"/user/edit/" + this.state.user._id}>
          <Button bsStyle="link" bsSize="xsmall"><span className="glyphicon glyphicon-pencil Profile-glyph" aria-hidden="true"> </span></Button>
          </LinkContainer>
          <DeleteUser userId={this.state.user._id}/> </span> )
          }</span>
        </div>
        </Panel.Body>
      </Panel>
      </div>
    )
  }
}


export default Profile
