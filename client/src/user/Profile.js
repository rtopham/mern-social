import React, {Component} from 'react'
import {Image, Panel, ListGroup, Button, ListGroupItem} from "react-bootstrap"
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import "./Profile.css"
import FollowProfileButton from './FollowProfileButton';
import FollowGrid from './FollowGrid'
import FindPeople from './FindPeople'
import {listByUser} from './../post/api-post.js'
import PostList from './../post/PostList'


class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: {following:[], followers:[]},
      redirectToSignin: false,
      following: false,
      posts: []
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
        let following = this.checkFollow(data)
//        console.log(following)
        this.setState({user: data, following: following})
        this.loadPosts(data._id)
      }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }

  checkFollow = (user) => {


    const jwt = auth.isAuthenticated()
    let match = user.followers.find((follower)=> {

      return (follower._id===jwt.user._id)
    
    })

    return match
  }
  clickFollowButton = (callApi) => {
    const jwt = auth.isAuthenticated()
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({user: data, following: !this.state.following})
      }
    })
  }

  loadPosts = (user) => {
    const jwt = auth.isAuthenticated()
    listByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({posts: data})
      }
    })
  }
  removePost = (post) => {
    const updatedPosts = this.state.posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    this.setState({posts: updatedPosts})
  }

  render() {
//console.log(this.state.user)
    const photoUrl = this.state.user.photo
                 ? (`/api/users/photo/${this.state.user._id}?${new Date().getTime()}`)
                 : (`/api/users/defaultphoto`)

    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="Profile">
      <Panel>
        <Panel.Heading>User Profile</Panel.Heading>
        <Panel.Body>
        <div className="ProfileImage">
        <Image src={photoUrl} responsive rounded />
        </div>
        <div className="ProfileList">
        <ListGroup>
          <ListGroupItem header={this.state.user.name}>{this.state.user.email}</ListGroupItem>
          <ListGroupItem header="About">{this.state.user.about}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroupItem>
        
        </ListGroup>
      </div>

        </Panel.Body>
        <Panel.Footer>
        
        
          {auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id ?(<span className="pull-right">
          <LinkContainer to={"/user/edit/" + this.state.user._id}>
          <Button bsStyle="link" bsSize="xsmall"><span className="glyphicon glyphicon-pencil Profile-glyph" aria-hidden="true"> </span></Button>
          </LinkContainer>
          <DeleteUser userId={this.state.user._id}/> </span> )
          :(<FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton}/>)
          }
        
        </Panel.Footer>
      </Panel>
      <FollowGrid text="Followers" people={this.state.user.followers}/>
      <FollowGrid text="Following" people={this.state.user.following}/>
      {auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id ?(<FindPeople/>):null}
      <PostList posts={this.state.posts}/>
      </div>
    )
  }
}


export default Profile
