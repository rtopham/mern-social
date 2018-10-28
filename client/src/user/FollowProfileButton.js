import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {unfollow, follow} from './api-user.js'

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow)
  }
  unfollowClick = () => {
    this.props.onButtonClick(unfollow)
  }
  render() {
    return (<div className="pull-right">
      { this.props.following
        ? (<Button bsSize="small" color="secondary" onClick={this.unfollowClick}>Unfollow</Button>)
        : (<Button bsSize="small" color="primary" onClick={this.followClick}>Follow</Button>)
      }
    </div>)
  }
}

export default FollowProfileButton
