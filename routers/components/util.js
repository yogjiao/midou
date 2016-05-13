
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
