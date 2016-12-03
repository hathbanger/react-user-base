// The middleware to call the API for quotes
// import { CALL_API } from './middleware/api'

// There are three possible states for our login
// process and we need actions for each of them
// import * as constants from './constants'


export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'


export const DELETE_REQUEST = 'DELETE_REQUEST'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'


export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'



export const APPROVE_REQUEST = 'APPROVE_REQUEST'
export const APPROVE_SUCCESS = 'APPROVE_SUCCESS'
export const APPROVE_FAILURE = 'APPROVE_FAILURE'



export const DISAPPROVE_REQUEST = 'DISAPPROVE_REQUEST'
export const DISAPPROVE_SUCCESS = 'DISAPPROVE_SUCCESS'
export const DISAPPROVE_FAILURE = 'DISAPPROVE_FAILURE'


export const FETCH_SUCCESS = 'FETCH_SUCCESS'


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  console.log('user', user)
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.token,
    username: user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('http://localhost:1323/login', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.auth_token)
          // console.log("user token: ", user)
          
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function signUp(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('http://localhost:1323/user', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.auth_token)
          // console.log("user token: ", user)
          
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}


function fetchPostsSuccess(posts){
  return {
    type: FETCH_SUCCESS,
    posts: posts
  }
}

// // Uses the API middlware to get a quote
export function fetchPosts() {
  // let connection = new WebSocket('ws://localhost:1323/ws');
  
return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(requestLogin(creds))
    return fetch('http://localhost:1323/hathbanger/posts')
      .then(response =>
        response.json()
        .then(posts => ({ posts, response }))
      ).then(({ posts, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          // dispatch(loginError(posts.message))
          return Promise.reject(posts)
        }
        else {
          console.log("posts: ", posts)
          
          // Dispatch the success action
          dispatch(fetchPostsSuccess(posts))
        }
      }).catch(err => console.log("Error: ", err))
  }
  
  
}


// Uses the API middlware to get a quote
export function search(creds) {
  console.log('creds', creds)
  let config = {
    method: 'GET'
  }
  return dispatch => {
    // dispatch(deleteRequest(creds))
    console.log('http://localhost:1323/hathbanger/search/twitter/' + creds, config)
    return fetch('http://localhost:1323/hathbanger/search/twitter/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(searchFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(searchSuccess()) 
            dispatch(fetchPosts())
          }
        })
  }
}


function searchRequest() {
  return {
    type: SEARCH_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function searchSuccess(creds) {
  return {
    type: SEARCH_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function searchFailure(creds) {
  return {
    type: SEARCH_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}




// Uses the API middlware to get a quote
export function approvePost(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(approveRequest(creds))
    console.log('http://localhost:1323/post/approve/' + creds, config)
    return fetch('http://localhost:1323/post/approve/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(approveFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(approveSuccess()) 
            dispatch(fetchPosts())
          }
        })
  }
}


function approveRequest() {
  return {
    type: APPROVE_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function approveSuccess(creds) {
  return {
    type: APPROVE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function approveFailure(creds) {
  return {
    type: APPROVE_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}


// Uses the API middlware to get a quote
export function disapprovePost(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(disapproveRequest(creds))
    console.log('http://localhost:1323/post/disapprove/' + creds, config)
    return fetch('http://localhost:1323/post/disapprove/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(disapproveFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(disapproveSuccess()) 
            dispatch(fetchPosts())
          }
        })
  }
}


function disapproveRequest() {
  return {
    type: DISAPPROVE_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function disapproveSuccess(creds) {
  return {
    type: DISAPPROVE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function disapproveFailure(creds) {
  return {
    type: DISAPPROVE_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}

// Uses the API middlware to get a quote
export function deletePost(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(deleteRequest(creds))
    console.log('http://localhost:1323/post/delete/' + creds, config)
    return fetch('http://localhost:1323/post/delete/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(deleteFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(deleteSuccess()) 
            dispatch(fetchPosts())
          }
        })
  }
}


function deleteRequest() {
  return {
    type: DELETE_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function deleteSuccess(creds) {
  return {
    type: DELETE_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function deleteFailure(creds) {
  return {
    type: DELETE_FAILURE,
    isFetching: false,
    isAuthenticated: true
  }
}