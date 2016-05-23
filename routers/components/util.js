
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
      s = prefixedZero(oCurrentDate.getSeconds()),
      w = oCurrentDate.getDay()? oCurrentDate.getDay() : 7,
      _w = now.getDay()? now.getDay() : 7
  //let  lastWeekend =  new Date(Math.floor(now.getTime() / ONE_DAY) * ONE_DAY - w * ONE_DAY)//oCurrentDate 的上一个礼拜天
  let  lastWeekend =  new Date(now.getFullYear(), now.getMonth(), now.getDate() - _w)//oCurrentDate 的上一个礼拜天

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
    // one = Math.floor(one.getTime() / ONE_DAY)
    // another = Math.floor(another.getTime() / ONE_DAY)
    one = Date.UTC(one.getFullYear(), one.getMonth(), one.getDate())
    another = Date.UTC(another.getFullYear(), another.getMonth(), another.getDate())
    let days = (another - one) / ONE_DAY
    return days
  }

  let isToday = (dTime) => {
    return getIntervalDays(dTime, now) == 0
  }
  let isYesterday = (dTime) => {
    return getIntervalDays(dTime, now) == 1
  }
  /**
  凌晨：0-5
  早上：5-11
  中午：11-13
  下午：13-17
  傍晚：17-19
  晚上：19-24
  */
  let getTimeExtendLabel = (h) => {
    let label = ''

    if (h < 5) {
      label = '凌晨'
    } else if (h < 11) {
      label = '早上'
    } else if (h < 13) {
      label = '中午'
    } else if (h < 17) {
      label = '下午'
    } else if (h < 19) {
      label = '傍晚'
    } else if (h < 24) {
      label = '晚上'
    }

    return label
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
    label += ' ' + getTimeExtendLabel(h) + `${_h}:${m}`
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
