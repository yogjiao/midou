import UAParser from 'UAParser'

let parser = new UAParser()

parser.isWeixin = (() => {
  //Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D167 MicroMessenger/6.3.9 NetType/WIFI Language/zh_CN
  return /MicroMessenger/.test(window.navigator.userAgent || '')
})()

export default parser
