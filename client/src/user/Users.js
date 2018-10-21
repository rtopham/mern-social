import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {list} from './api-user.js'
import "./Users.css";

class Users extends Component {
  state = {
      users: []
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
        
      }
    })
  }

  render() {
    
    return (
 <div className="Users">
<Panel>
  <Panel.Heading>All Users</Panel.Heading>
  <ListGroup>        

         {this.state.users.map((item, i) => {
          return <ListGroupItem key={i}><Link to={"/user/" + item._id} key={i}>
          {item.name}</Link></ListGroupItem>
               })
             }
             </ListGroup>
</Panel>
 </div>
    )
  }
}

export default Users
