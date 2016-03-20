import {
  TEST_TOKEN,

  CALL_HANDLER_GET_USER_INFO,
  CALL_HANDLER_CALL_OUT_LOGIN_PANEL,
  CALL_HANDLER_CHECKOUT,
  CALL_HANDLER_SHARE,
  CALL_HANDLER_BACK_TO_NATIVE_PAGE,
  CALL_HANDLER_CALL_OUT_NATIVE_HOME_PANEL,
  CALL_HANDLER_REDIRECT_TO_NEXT,
  CALL_HANDLER_GET_APP_VERSION
} from 'macros.js'


function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe) }, 0)
}

function handler(handlerName) {
  return function() {
    let args = arguments;
    let bridge = window.WebViewJavascriptBridge;
    if (bridge) {
      bridge[handlerName].apply(this, args)
    } else {
      setupWebViewJavascriptBridge(function(bridge){
        bridge[handlerName].apply(this, args)
      });
    }
  }

}
export let registerHandler = handler('registerHandler');
export let callHandler = handler('callHandler');

// cached  user login info
let loginInfo = {}
export let getUserInfoFromApp = function() {
  return new Promise((resolve, reject) => {
    callHandler(CALL_HANDLER_GET_USER_INFO, {}, function(response) {
        resolve({loginToken: response.token, userName: response.userName})
      })
  });
}

// export let getUserInfoFromApp = function() {
//   return new Promise((resolve, reject) => {
//     resolve({loginToken: TEST_TOKEN})
//   });
// }


export let callOutLoginPanel = function() {
  return new Promise((resolve, reject) => {
    callHandler(CALL_HANDLER_CALL_OUT_LOGIN_PANEL, {}, function(response) {
        resolve(response)
      })
  });
}
export let notifyAppToCheckout = function(data) {
  return new Promise((resolve, reject) => {
    callHandler(CALL_HANDLER_CHECKOUT, data, function(response) {
        resolve(response)
      })
  });
}
export let shareToSocialCircle = function(data) {
  return new Promise((resolve, reject) => {
    callHandler(CALL_HANDLER_SHARE, data, function(response) {
        resolve(response)
      })
  });
}

export let backToNativePage = function() {
  return new Promise((resolve, reject) => {
    callHandler(CALL_HANDLER_BACK_TO_NATIVE_PAGE, {}, function(response) {
        resolve(response)
      })
  });
}

export let backToHomeNativePage = function() {
  return new Promise((resolve, reject) => {
    callHandler(CALL_HANDLER_CALL_OUT_NATIVE_HOME_PANEL, {}, function(response) {
        resolve(response)
      })
  });
}

export let notifyAppUrlChanged = function(data) {
  return new Promise((resolve, reject) => {
    callHandler(CALL_HANDLER_REDIRECT_TO_NEXT, data, function(response) {
        resolve(response)
      })
  });
}

export let getAppVerison = function(data) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout( () => {
      reject(new Error('time out'))
    }, 1000)

    callHandler(CALL_HANDLER_GET_APP_VERSION, data, function(response) {
        clearTimeout(timer)
        resolve(response)
      })
  });
}
