import {
  TEST_TOKEN,

  CALL_HANDLER_GET_USER_INFO,
  CALL_HANDLER_CALL_OUT_LOGIN_PANEL,
  CALL_HANDLER_CHECKOUT,
  CALL_HANDLER_SHARE,
  CALL_HANDLER_BACK_TO_NATIVE_PAGE,
  CALL_HANDLER_CALL_OUT_NATIVE_HOME_PANEL,
  CALL_HANDLER_REDIRECT_TO_NEXT,
  CALL_HANDLER_GET_APP_VERSION,
  IOS_APP_STORE_URL,
  DOWNLOAD_APP_URL
} from 'macros.js'

import {getMiDouToken} from 'commonApp.js'
import ua from 'uaParser.js'

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


/*************registerHandler******************/
/*
{
  1: '内衣搜索'
  2: '分享'
  3: '购物车编辑'
  4: '删除订单'
  5：'购物车浏览'
  6：'刷新购物车'
  7：'保存物流信息'
  8：'保存收货人信息',
  9: '选择收货人信息'
  10：'编辑用户秀照片'
  11: '完成编辑用户秀照片'
}
*/
export let receiveNotificationsFromApp = function(callback){
    registerHandler('notifyWebBridge', callback)//data, responseCallback
}

export let sendNotificationsToApp = function(data, callback){
  callHandler('calloutNewWebview', param || {}, function(response) {
      callback(response)
    })
}

/**************communication between pages by oc****************/
export let sendSignalToOtherPagesByOc = function(data){
  let params = {means: `RECIEVE_SIGNAL_FROM_OTHER_PAGE_BY_OC(${JSON.stringify(data)})`}
  callHandler('receiveWebBridge', params, function(response) {
      //callback(response)
    })
}

// reginster the method to recieve the signal sending from other page

export let recievePageToPageSignal = function (callback) {
  window.RECIEVE_SIGNAL_FROM_OTHER_PAGE_BY_OC = function(params) {//{signal: 1}
    callback(params)
  }

}


/*************callHandler******************/

// cached  user login info
export let getUserInfoFromApp = function() {
  return new Promise((resolve, reject) => {
    if (ua.isApp()) {
      let midouToken = getMiDouToken()
      if (midouToken) {
        resolve({loginToken: midouToken})
      } else {
        callHandler(CALL_HANDLER_GET_USER_INFO, {}, function(response) {
          if (response.token) {
            document.cookie = 'midouToken=' + response.token + ';' + 'expires=' + new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toGMTString();
            resolve({loginToken: response.token, userName: response.userName})
          } else {
            reject({rea: 1001})
          }
        })
      }
    } else if(ua.getOS().name = 'iOS' && ua.isWeixin()) {
      reject({rea: 1001})
      window.location.href = DOWNLOAD_APP_URL
    } else {
      reject({rea: 1001})
      window.location.href = IOS_APP_STORE_URL

    }

  })
}



//calloutNewWebview

export let calloutNewWebview = function(param) {
  return new Promise((resolve, reject) => {
    callHandler('calloutNewWebview', param || {}, function(response) {
        resolve(response)
      })
  });
}

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

export let calloutNativePhoto = function() {
  return new Promise((resolve, reject) => {
    callHandler('calloutPhoto', {}, function(response) {
        resolve(response)
      })
  });
}

export let calloutNativeMorePhoto = function() {
  return new Promise((resolve, reject) => {
    callHandler('calloutMorePhoto', {}, function(response) {
        resolve(response)
      })
  });
}
