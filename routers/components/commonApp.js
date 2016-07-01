/**
 * 当用户选择一件内衣的尺码为   底围：X  罩杯:B  那么推荐的尺码为两个，一个是： 底围X－5   罩杯：加大一个杯即C  另一个是：底围X＋5   罩杯：减小一个杯即A
 *
 */
import {
  UNDERWEAR_BRA_SIZE,
  UNDERWEAR_BASE_SIZE
} from 'macros.js'

import {
  getCookie,
  pick
} from 'util.js'



export function getMiDouToken() {
  return getCookie('midouToken')
}
/*
user-agent:
Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D167 neixin/1.3.1
*/



export function getAppVerison() {
  let version = '0.0.0'
  try {
    version = navigator.userAgent.match(/neixin\/(\d.\d.\d)/im)[1]
  } catch (e) {}
  return version
}
export function compareVersion(a, b){//1.1.0
  // a >ｂ　1
  // a = b  0
  // a < b -1
  if (a == b) {
    return 0
  } else {
    a = a.split('.')
    b = b.split('.')
   let r = a.some((item, index) => {
      return a[index] < b[index]
    })
   if (r) {
     return -1
   } else {
     return 1
   }
  }
}
