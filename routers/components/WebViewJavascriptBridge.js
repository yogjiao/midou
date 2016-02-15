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
// setupWebViewJavascriptBridge(function(bridge) {
//   bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {// oc 调用 js 主动联系js
//     log('ObjC called testJavascriptHandler with', data)
//     var responseData = { 'Javascript Says':'Right back atcha!' }
//     log('JS responding with', responseData)
//     responseCallback(responseData)
//   })
//
//   bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function(response) {//js 调用 oc 主动联系oc
//     log('JS got response', response)
//   })
// })



// export function registerHandler() {
//     let args = arguments;
//     let bridge = window.WebViewJavascriptBridge;
//     if (bridge) {
//       bridge.registerHandler.apply(this, args)
//     } else {
//       setupWebViewJavascriptBridge(function(bridge){
//         bridge.registerHandler.apply(this, args)
//       });
//     }
//   }
// export function  callHandler() {
//     let args = arguments;
//     let bridge = window.WebViewJavascriptBridge;
//     if (bridge) {
//       bridge.callHandler.apply(this, args)
//     } else {
//       setupWebViewJavascriptBridge(function(bridge){
//         bridge.callHandler.apply(this, args)
//       });
//     }
//   }
