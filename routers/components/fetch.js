import {getUserInfoFromApp} from 'webviewInterface.js'
function checkStatus(response) {
  if (response.status == 200 ) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}



export default function(url, options = {}) {
  getUserInfoFromApp()
    .then((data) => {
      let header = options.headers
      fetch.apply(null, arguments)
    })
    .then(checkStatus)
    .them(function(response){
      return response.json()
    })
}
