function checkStatus(response) {
  if (response.status == 200 ) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export default function() {
  return fetch.apply(null, arguments)
          .then(checkStatus)
          .then(function(response){
            return response.json()
          })
  }
