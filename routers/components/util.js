
/**
 * find the parent node of some node by className include node self exclude untilNode
 */
export function getParentByClass(node, parentClassName, untilNode ) {
  untilNode = untilNode || document;
  while ( node != untilNode && !node.classList.contains(parentClassName) ) {
     node = node.parentNode;
  }
  return  node === untilNode ? null : node;
}
export function pick(source, ...args) {
  let copy = {}
  args.forEach(function(key, index){
    copy[key] = source[key]
  })
  return copy
}

/**
 * @param currentTime {Number} millionsecondes
 * @param withTime {Boolean} [withTime=false] is with time
 */
export function getTimeLabel(currentTime, withTime) {
  const ONE_DAY = 24 * 60 * 60 * 1000
  const WEEK_LABEL = ['', '一', '二', '三', '四', '五', '六', '日']
  let prefixedZero = (num, length = 2) => {
    return ('0000' + num).slice(-length)
  }
  let label,
      now = new Date(),
      oCurrentDate = new Date(currentTime),
      Y = oCurrentDate.getFullYear(),
      M = prefixedZero(oCurrentDate.getMonth() + 1),
      D = prefixedZero(oCurrentDate.getDate()),
      h = oCurrentDate.getHours(),
      _h = prefixedZero(h),
      m = prefixedZero(oCurrentDate.getMinutes()),
      s = prefixedZero(oCurrentDate.getMinutes()),
      w = oCurrentDate.getDay()? oCurrentDate.getDay() : 7,
      lastWeekend =  new Date(Math.floor((now.getTime() - w * ONE_DAY)/ ONE_DAY ))//oCurrentDate 的上一个礼拜天

  let isSameYear = (one, another) => {
    return one.getFullYear() == another.getFullYear()
  }
  let isSameMonth = (one, another) => {
    return isSameYear(one, another) &&
           one.getMonth() == another.getMonth()
  }
  let isSameDate = (one, another) => {
    return isSameMonth(one, another) &&
           one.getDate() == another.getDate()
  }
  let getIntervalDays = (one, another) => {
    one = Math.floor(one.getTime() / ONE_DAY)
    another = Math.floor(another.getTime() / ONE_DAY)
    return another - one
  }

  let isToday = (dTime) => {
    return getIntervalDays(dTime, now) == 0
  }
  let isYesterday = (dTime) => {
    getIntervalDays(dTime, now) == 1
  }

  if (isToday(oCurrentDate)) {
    label = ''
  } else if (isYesterday(oCurrentDate)) {
    label = '昨天'
  } else if (getIntervalDays(lastWeekend, oCurrentDate) > 0) {
    label = `周${WEEK_LABEL[w]}`
  } else if (isSameYear(oCurrentDate, now)) {
    label = `${M}月${D}日`
  } else {
    label = `${Y}年${M}月${D}日`
  }

  if (withTime || !label) {
    label += ' ' + (h < 12? '上午' : '下午') + `${_h}:${m}`
  }
  return label
};

export function getCookie(name) {
  let text = `${name}=([^;]+)`
  let parttern = new RegExp(text, 'i')
  let value
  try {
    value = document.cookie.match(parttern)[1]
  } catch (e) {
    value = ''
  }
  return value
}

export const REGEXP_URL = /https?\:\/\/.+/i;
