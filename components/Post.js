import React, { Component, PropTypes } from 'react'
import { approvePost, disapprovePost, deletePost } from '../actions'

export default class Post extends Component {
  
  render() {
    const { errorMessage, dispatch } = this.props
    
    return (
      <div>
        <div className="col-sm-3">
          <div className="card">
            <img className="img-fluid card-img-top" src={this.props.post.imgurl} alt="Card image cap"/>
            <div className="card-block">
              <a onClick={(event) => this.handleApproveClick(event)} className="btn btn-success btn-block">Approve</a>
              <a onClick={(event) => this.handleDisapproveClick(event)} className="btn btn-warning btn-block">Disapprove</a>
              <a onClick={(event) => this.handleDeleteClick(event)} className="btn btn-danger btn-block">Delete</a>
            </div>
          </div>      
        </div>
      </div>
    )
  }
  

  handleApproveClick(event) {
    const creds = { pic_id: this.props.post.id }
    this.props.dispatch(approvePost(this.props.post.id))
  }

  handleDisapproveClick(event) {
    const creds = { pic_id: this.props.post.id }
    this.props.dispatch(disapprovePost(this.props.post.id))
  }

  handleDeleteClick(event) {
    const creds = { pic_id: this.props.post.id }
    this.props.dispatch(deletePost(this.props.post.id))
  }

}

Post.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}