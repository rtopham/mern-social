import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Image, Panel, ListGroup, ListGroupItem} from "react-bootstrap"
import "./FindPeople.css"


class FollowGrid extends Component {
  render() {


    return (<div className="FindPeople">
      <Panel>
        <Panel.Heading>{this.props.text}</Panel.Heading>
      <ListGroup >
        {this.props.people.map((person, i) => {

const photoUrl = (`/api/users/photo/${person._id}?${new Date().getTime()}`)

           return  <ListGroupItem key={i}>
              <Link to={"/user/" + person._id}>
                <Image src={photoUrl} />
                {person.name}
              </Link>
            </ListGroupItem>
        })}
      </ListGroup>
     </Panel>
    </div>)
  }
}

export default FollowGrid
