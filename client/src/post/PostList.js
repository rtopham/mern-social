import React, {Component} from 'react'
import {Panel} from "react-bootstrap"
import Post from './Post'
import "./PostList.css"

class PostList extends Component {
  render() {
    return (
      <div className="PostList">
      <Panel>
        <Panel.Heading>Posts</Panel.Heading>
        <Panel.Body>
      <div style={{marginTop: '24px'}}>
        {this.props.posts.map((item, i) => {
            return <Post post={item} key={i} onRemove={this.props.removeUpdate}/>
          })
        }
      </div>
      </Panel.Body>
      </Panel>
      </div>
    )
  }
}

export default PostList
