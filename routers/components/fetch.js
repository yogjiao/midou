import {getUserInfoFromApp, callOutLoginPanel} from 'webviewInterface.js'
import {NOT_LOGIN_ERROR, MIDOU_TOKEN_NAME, TEST_TOKEN} from 'macros.js'

import uaParser from 'uaParser.js'


function checkStatus(response) {
  if (response.status == 200 ) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export let fetchable = (...args) => {
  return fetch.apply(null, args)
            .then(checkStatus)
            .then(function(response){
              return response.json()
            })
}

export let fetchAuth = (url, options = {}) => {
  return getUserInfoFromApp()
            .then((data) => {
              if (data.loginToken) {
                let headers = options.headers? options.headers : options.headers = {}
                headers[MIDOU_TOKEN_NAME] = data.loginToken
                fetch.apply(null, arguments)
              } else {
                callOutLoginPanel();
                throw new Error(NOT_LOGIN_ERROR)
              }
            })
            .then(checkStatus)
            .then(function(response){
              return response.json()
            })
};

export let fetchMock = (url, options = {}) => {
  let headers = options.headers? options.headers : options.headers = {}
  headers[MIDOU_TOKEN_NAME] = TEST_TOKEN
  return fetch.call(null, url, options)
            .then(checkStatus)
            .then(function(response){
              return response.json()
            })
}

if (uaParser.getOS().name != 'IOS') {
  fetchAuth = fetchMock
}

export default fetchAuth
