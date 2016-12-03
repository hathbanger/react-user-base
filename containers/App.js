import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser, fetchPosts } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Home from '../components/Home'

class App extends Component {
  
  render() {
    const { dispatch,  isAuthenticated, errorMessage, posts } = this.props
    
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        <Home
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
          posts={this.props.posts}
        />
      </div>
    )
  }
}

App.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  
  const { auth, postFetch } = state
  const { isAuthenticated, errorMessage } = auth
  const { posts } = postFetch
  
  return {
    isAuthenticated,
    posts,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)

