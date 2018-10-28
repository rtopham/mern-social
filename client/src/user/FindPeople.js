import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {findPeople, follow} from './api-user.js'
import auth from './../auth/auth-helper'
import {Image, Panel, ListGroup, Button, ListGroupItem} from "react-bootstrap"
import "./FindPeople.css"

class FindPeople extends Component {
  state = {
      users: [],
      open: false
  }
  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    findPeople({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }
  clickFollow = (user, index) => {
    const jwt = auth.isAuthenticated()
    follow({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        let toFollow = this.state.users
        toFollow.splice(index, 1)
        this.setState({users: toFollow, open: true, followMessage: `Following ${user.name}!`})
      }
    })
  }
  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }
  render() {

    return (<div className="FindPeople">
      <Panel>
        <Panel.Heading>Who to follow</Panel.Heading>
        <ListGroup>
          {this.state.users.map((item, i) => {
              return <span key={i}>
                <ListGroupItem className="FindPeopleListGroupItem">
                <Link to={"/user/" + item._id}>
                      <Image src={'/api/users/photo/'+item._id}/>
                  
                  {item.name}
                  
                      
                      
                  </Link>
                    <Button className="FindPeopleFloatRight" aria-label="Follow" onClick={this.clickFollow.bind(this, item, i)}>
                      Follow
                    </Button>
                <hr/>    
                </ListGroupItem>
                
                </span>
            })
          }
        </ListGroup>

</Panel>
    </div>)
  }
}

export default FindPeople
