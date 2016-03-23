
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
  let text = `${name}=\s*(\w+)\s*;`
  let pattern = new RegExp(text, 'i')
  let value
  try {
    value = pattern.match(document.cookie)[1]
  } catch (e) {
    value = ''
  }
  return value
}
