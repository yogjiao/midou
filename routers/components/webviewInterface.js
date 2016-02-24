import {
          CALL_HANDLER_GET_USER_INFO,
          CALL_HANDLER_CALL_OUT_LOGIN_PANEL,
          CALL_HANDLER_CHECKOUT,
          CALL_HANDLER_SHARE,
          TEST_TOKEN
       } from 'macros.js'


function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
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
//let loginInfo = {}
export let getUserInfoFromApp = function() {
  return new Promise((resolve, reject) => {
    bridge.callHandler(CALL_HANDLER_GET_USER_INFO, {}, function(response) {
        //loginInfo = response
        resolve({loginToken: response.token, userName: response.userName})
      })
  });
}
export let callOutLoginPanel = function() {
  return new Promise((resolve, reject) => {
    bridge.callHandler(CALL_HANDLER_CALL_OUT_LOGIN_PANEL, {}, function(response) {
        resolve(response)
      })
  });
}
export let notifyAppToCheckout = function() {
  return new Promise((resolve, reject) => {
    bridge.callHandler(CALL_HANDLER_CHECKOUT, {}, function(response) {
        resolve(response)
      })
  });
}
export let shareToSocialCircle = function() {
  return new Promise((resolve, reject) => {
    bridge.callHandler(CALL_HANDLER_SHARE, {}, function(response) {
        resolve(response)
      })
  });
}
