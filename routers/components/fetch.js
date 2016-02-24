import {getUserInfoFromApp, callOutLoginPanel} from 'webviewInterface.js'
import {NOT_LOGIN_ERROR, MIDOU_TOKEN} from 'macros.js'
function checkStatus(response) {
  if (response.status == 200 ) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export let fetchable = () => {
  return fetch.apply(null, arguments)
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
                headers[MIDOU_TOKEN] = data.loginToken
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
export default fetchAuth
