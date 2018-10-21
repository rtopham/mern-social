import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class DeleteProfileModal extends Component {
  
  render() {

    return (

<div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title>Delete Account</Modal.Title>
    </Modal.Header>

    <Modal.Body>Confirm to delete your account.</Modal.Body>

    <Modal.Footer>
      <Button onClick={this.props.handleRequestClose}>Cancel</Button>
      <Button bsStyle="primary" onClick={this.props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div>


    )

  }
}

export default DeleteProfileModal
