import { combineReducers } from 'redux'
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, FETCH_SUCCESS
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    console.log('login request', action)
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds.username
      })
    case LOGIN_SUCCESS:
    console.log('login success', action)
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        username: action.username,
        errorMessage: ''
      })
    case LOGIN_FAILURE:

      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
    }
}

function postFetch(state = {
  isFetching: false,
  posts: []
}, action) {
  switch (action.type) {
    case  FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts
      })
    default:
      return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const userLogin = combineReducers({
  auth,
  postFetch
})

export default userLogin