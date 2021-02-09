export function createNodeFromObject(obj: any, xmlDoc: XMLDocument, nodeName: string): Element {
  return Object.keys(obj).reduce((parentNode, key) => {
    const node = xmlDoc.createElement(key);
    const value = xmlDoc.createTextNode(obj[key] ? obj[key].toString() : '');
    node.appendChild(value);
    parentNode.appendChild(node);
    return parentNode;
  }, xmlDoc.createElement(nodeName));
}
