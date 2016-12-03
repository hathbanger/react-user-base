import React, { Component, PropTypes } from 'react'
import SignUpContainer from '../containers/SignUpContainer'
import PostsContainer from '../containers/PostsContainer'
import SearchBar from './SearchBar'
// import { fetchPosts } from '../actions'

export default class Home extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage, posts } = this.props
    return (
      <div className="container">
        <div className="jumbotron">
          {!isAuthenticated &&
            <div>
              <SignUpContainer dispatch={dispatch} />
            </div>          
          }
          {isAuthenticated &&
            <div>
              <SearchBar dispatch={dispatch} />
              <PostsContainer dispatch={dispatch} posts={this.props.posts} />
            </div>
          } 
        </div>
      </div>
    )
  }

}

Home.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}