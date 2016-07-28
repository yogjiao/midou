import {
  getUserInfoFromApp,
  callOutLoginPanel,
  getAppVerison
} from 'webviewInterface.js'
import {
  NOT_LOGIN_ERROR,
  MIDOU_TOKEN_NAME,
  TEST_TOKEN,
  IOS_APP_STORE_URL,
  DOWNLOAD_APP_URL
} from 'macros.js'

import {getMiDouToken} from 'commonApp.js'

import ua from 'uaParser.js'


function checkStatus(response) {
  if (response.status == 200 ) {
    return response
  } else if (response.status == 502){
    alert('断网了')
    let error = new Error(response.statusText)
    error.response = response
    throw error
  } else {
    alert('系统错误')
    let error = new Error(response.statusText)
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
};

// let fetchAuth = (url, options = {}) => {
//   return getAppVerison()
//             .then((version)=>{
//               return version
//             }, (e)=>{
//               if (uaParser.getOS().name = 'iOS' && uaParser.isWeixin) {
//                 window.location.href = DOWNLOAD_APP_URL
//               } else {
//                 window.location.href = IOS_APP_STORE_URL
//               }
//             })
//             .then(()=>{
//               return  getUserInfoFromApp()
//             })
//             .then((data) => {
//               if (data.loginToken) {
//                 let headers = options.headers? options.headers : options.headers = {}
//                 headers[MIDOU_TOKEN_NAME] = data.loginToken
//                 return fetch(url, options)
//               }
//               // else {
//               //   callOutLoginPanel()
//               //   throw new Error(NOT_LOGIN_ERROR)
//               // }
//             })
//             .then(checkStatus)
//             .then(function(response){
//               return response.json()
//             })
// };

let fetchAuth = (url, options = {}) => {
  return getUserInfoFromApp()
          .then((data) => {
            let headers = options.headers? options.headers : options.headers = {}
            headers[MIDOU_TOKEN_NAME] = data.loginToken
            return fetch(url, options)
            // else {
            //   callOutLoginPanel()
            //   throw new Error(NOT_LOGIN_ERROR)
            // }
          })
          .then(checkStatus)
          .then(function(response){
            return response.json()
          })
}

export let fetchOption = (url, options = {}) => {
  let headers = options.headers? options.headers : options.headers = {}
  headers[MIDOU_TOKEN_NAME] = getMiDouToken()
  return fetch.call(null, url, options)
            .then(checkStatus)
            .then(function(response){
              return response.json()
            })
};

let fetchMock = (url, options = {}) => {
  let headers = options.headers? options.headers : options.headers = {}
  headers[MIDOU_TOKEN_NAME] = TEST_TOKEN
  return fetch.call(null, url, options)
            .then(checkStatus)
            .then(function(response){
              return response.json()
            })
};

if (__DEBUG__) {
 fetchAuth = fetchMock
}
// if (uaParser.getOS().name != 'iOS') {
//   fetchAuth = fetchMock
// }

export {fetchAuth}

//export default fetchAuth
