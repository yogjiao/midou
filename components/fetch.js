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
    fetch.apply(null, arguments)
      .then(checkStatus)
      .then(function(data){
        return JSON.parse(data)
      })
      .catch(function(error){
        console.log(error.message)
      })
  }
