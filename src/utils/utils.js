const clearNode = (node) => {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
};

const clearEventListener = (node) => {
  const oldNode = node;
  const newNode = oldNode.cloneNode(true);
  oldNode.parentNode.replaceChild(newNode, oldNode);
  return newNode;
};
export { clearNode, clearEventListener };
