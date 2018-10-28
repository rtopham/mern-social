import React, {Component} from 'react'
import {Image, Panel, Glyphicon, Well, FormGroup,FormControl, Button } from "react-bootstrap"
import auth from './../auth/auth-helper'
import {comment, uncomment} from './api-post.js'
import {Link} from 'react-router-dom'
import "./Comments.css"

class Comments extends Component {
  state = {text: ''}
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }
  addComment = (event) => {
    if(event.keyCode === 13 && event.target.value){
      event.preventDefault()
      const jwt = auth.isAuthenticated()
      comment({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }, this.props.postId, {text: this.state.text}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({text: ''})
          this.props.updateComments(data.comments)
        }
      })
    }
  }

  deleteComment = comment => event => {
    const jwt = auth.isAuthenticated()
    uncomment({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.props.postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.props.updateComments(data.comments)
      }
    })
  }
  render() {

    const commentBody = item => {
      return (
        <div>
          <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link> commented on this post on &nbsp; 
          <span>
            {(new Date(item.created)).toDateString()} 
            {auth.isAuthenticated().user._id === item.postedBy._id &&
              <Button bsStyle="link" className="pull-right" onClick={this.deleteComment(item)}>
              <Glyphicon glyph="trash"/></Button>}
          </span>
          <br/>
          <br/>
          <Well>{item.text}</Well>

        </div>
      )
    }

    return (<div>
        <Panel>
        <Panel.Heading className="CommentPanelHeading">
              
        <Image circle className="CommentAuthorImage" src={'/api/users/photo/'+auth.isAuthenticated().user._id}/>
        Comment on this Post   
             
        </Panel.Heading>
        <Panel.Body>
<form>
      <FormGroup controlId="about" bsSize="large">
         
          <FormControl
            componentClass="textarea"
            type="text"
            value={this.state.text}
            onChange={this.handleChange('text')}
            placeholder="Write something ..."
            onKeyDown={this.addComment}
          />
        </FormGroup>
</form>
</Panel.Body>
        { this.props.comments.map((item, i) => {
            return <Well key={i}>
                      
                        <Image className="CommentAuthorImage" circle src={'/api/users/photo/'+item.postedBy._id}/>
                      
                      {commentBody(item)}
                      
                      
                      </Well>
              })
        }
        
        </Panel>
    </div>)
  }
}

export default Comments
