
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
