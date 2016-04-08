import UAParser from 'ua-parser-js'

let parser = new UAParser()

parser.isWeixin = () => {
  //Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D167 MicroMessenger/6.3.9 NetType/WIFI Language/zh_CN
  return /MicroMessenger/.test(window.navigator.userAgent || '')
}

let appParttern = /neixin\/(\d+\.\d+(?:\.\d+)?)/i

parser.isApp = () => {
  return appParttern.test(window.navigator.userAgent || '')
}

parser.getAppVerison = () => {
  let version
  try {
    version = window.navigator.userAgent.match(appParttern)[1]
  } catch (e) {
    version = 0
  }
  return version
}

export default parser
