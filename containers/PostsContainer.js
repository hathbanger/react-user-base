import React, { Component, PropTypes } from 'react'
import { fetchPosts } from '../actions'
import Post from '../components/Post'

class PostsContainer extends Component {
  componentDidMount(){
    let dispatch = this.props.dispatch
    dispatch(fetchPosts())
  }
  render() {
    const { dispatch,  isAuthenticated, errorMessage, posts } = this.props

    return (
      <div>
        <div className="card-group">
          {this.props.posts.map(function(post, index){
              if (!post.approved && !post.rated ) return (
                <Post
                key={ index }
                post={post}
                dispatch={dispatch} 
                onSignupClick={ creds => dispatch(signUp(creds)) }
                isAuthenticated={isAuthenticated}
                />)        
            })}        
        </div>
      </div>
    )
  }
}

PostsContainer.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}


export default PostsContainer

