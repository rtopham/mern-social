import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import {Media,Glyphicon, Image, Panel,Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {remove, like, unlike} from './api-post.js'
import Comments from './Comments'
import "./Post.css"

class Post extends Component {
  state = {
    like: false,
    likes: 0,
    comments: []
  }

  componentDidMount = () => {
    this.setState({like:this.checkLike(this.props.post.likes), likes: this.props.post.likes.length, comments: this.props.post.comments})
  }
  componentWillReceiveProps = (props) => {
    this.setState({like:this.checkLike(props.post.likes), likes: props.post.likes.length, comments: props.post.comments})
  }

  checkLike = (likes) => {
    const jwt = auth.isAuthenticated()
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
  }

  like = () => {
    let callApi = this.state.like ? unlike : like
    const jwt = auth.isAuthenticated()
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.props.post._id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({like: !this.state.like, likes: data.likes.length})
      }
    })
  }

  updateComments = (comments) => {
    this.setState({comments: comments})
  }

  deletePost = () => {
    const jwt = auth.isAuthenticated()
    remove({
      postId: this.props.post._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.props.onRemove(this.props.post)
      }
    })
  }
  render() {

    return (
      <Panel>
        <Panel.Heading className="post-panel-heading">


<div className="FirstCollumn">
        <Image circle className="PostAuthorImage" src={'/api/users/photo/'+this.props.post.postedBy._id}/>
</div>

            
<div className="SecondCollumn">              

              {<Link to={"/user/" + this.props.post.postedBy._id}>{this.props.post.postedBy.name}</Link>}
              <br></br>
              {(new Date(this.props.post.created)).toDateString()}
</div>
<div className="ThirdCollumn">


              {this.props.post.postedBy._id === auth.isAuthenticated().user._id &&
              <Button bsStyle="link"><Glyphicon glyph="trash" onClick={this.deletePost}/></Button>
              
              }
</div>
              


              



        </Panel.Heading>
        <Panel.Body>
 
        <Media>
            <Media.Left>
 
          {this.props.post.photo &&
            (<div className="">

              <img
                className="PostPhoto" alt=""
                src={'/api/posts/photo/'+this.props.post._id}
                />


            </div>)}
            </Media.Left>
            <Media.Body>
            {this.props.post.text}
            </Media.Body>
            </Media>
        </Panel.Body>
        <Panel.Footer>
        { this.state.like
            ? <Button bsStyle="link" onClick={this.like} aria-label="Like">
                <Glyphicon glyph="thumbs-up" />
              </Button>
            : <Button bsStyle="link" onClick={this.like} aria-label="Unlike">
                <Glyphicon glyph="thumbs-up" />
              </Button> } <span>{this.state.likes}</span>
              <Button disabled={true} bsStyle="link" aria-label="Comment">
              <Glyphicon glyph="comment" />
              </Button> <span>{this.state.comments.length}</span>
 

        </Panel.Footer>
        <hr/>
              <Comments postId={this.props.post._id} comments={this.state.comments} updateComments={this.updateComments}/>
        </Panel>



      
    )
  }


}

export default Post
