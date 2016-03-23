/**
 * 当用户选择一件内衣的尺码为   底围：X  罩杯:B  那么推荐的尺码为两个，一个是： 底围X－5   罩杯：加大一个杯即C  另一个是：底围X＋5   罩杯：减小一个杯即A
 *
 */
import {
  UNDERWEAR_BRA_SIZE,
  UNDERWEAR_BASE_SIZE
} from 'macros.js'

import {
  getCookie
} from 'util.js'

export function countBoxes(braSize, baseSize) {
  baseSize = parseInt(baseSize)
  return [
    {
      braSize: String.fromCharCode(Math.min(braSize.charCodeAt(0) + 1, UNDERWEAR_BRA_SIZE.slice(-1)[0].value.charCodeAt(0))),
      baseSize: Math.max(baseSize - 5, UNDERWEAR_BASE_SIZE[1].value)
    },
    {
      braSize: String.fromCharCode(Math.max(braSize.charCodeAt(0) - 1, UNDERWEAR_BRA_SIZE[1].value.charCodeAt(0))),
      baseSize: Math.min(baseSize + 5, UNDERWEAR_BASE_SIZE.slice(-1)[0].value)
    }
  ]
};

export function getMiDouToken() {
  return getCookie('midouToken')
}
