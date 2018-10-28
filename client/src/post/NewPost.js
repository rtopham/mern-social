import React, {Component} from 'react'
import {Image, Glyphicon, Panel, Button,FormGroup, ControlLabel, FormControl} from "react-bootstrap"
import {create} from './api-post.js'
import auth from './../auth/auth-helper'
import "./NewPost.css"

class NewPost extends Component {
  state = {
    text: '',
    photo: '',
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.postData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }
  clickPost = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.postData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({text:'', photo: ''})
        this.props.addUpdate(data)
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.postData.set(name, value)
    this.setState({ [name]: value })
  }
  render() {

    return (<div className="NewPost">
      <Panel>
      <Panel.Heading>
            
            <Image circle className="NewPostImage" src={'/api/users/photo/'+this.state.user._id}/>
            
            {this.state.user.name}
            
      </Panel.Heading>    
      <Panel.Body>
      <FormGroup controlId="post" bsSize="large">
          <ControlLabel>New Post</ControlLabel>
          <FormControl
            componentClass="textarea"
            type="text"
            value={this.state.text}
            placeholder="Share your thoughts..."
            onChange={this.handleChange('text')}
          />
        </FormGroup>
        <FormGroup>

        <input accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
        <span><Button componentClass="span"><Glyphicon glyph="camera" /></Button></span>
        </label><span className="NewPostFileName" >{this.state.photo ? this.state.photo.name : ''}</span>

        </FormGroup>
        <FormGroup>
        { this.state.error && (<span>
            <Glyphicon glyph="warning-sign"></Glyphicon>{this.state.error}</span>)
        }
        </FormGroup>
      </Panel.Body>
      <Panel.Footer>
        <Button color="primary" disabled={this.state.text === ''} onClick={this.clickPost} className="">POST</Button>
        </Panel.Footer>
    </Panel>
  </div>)
  }
}

export default NewPost
