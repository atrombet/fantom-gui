import { XmlFile } from "../interfaces";

export function createNodeFromObject(obj: any, xmlDoc: XMLDocument, nodeName: string): Element {
  return Object.keys(obj).reduce((parentNode, key) => {
    const node = xmlDoc.createElement(key);
    const value = xmlDoc.createTextNode(obj[key] ? obj[key].toString() : '');
    node.appendChild(value);
    parentNode.appendChild(node);
    return parentNode;
  }, xmlDoc.createElement(nodeName));
}

export function createNodeFromValue(value: string | number, xmlDoc: XMLDocument, nodeName: string): Element {
  const node = xmlDoc.createElement(nodeName);
  const text = xmlDoc.createTextNode(value.toString());
  node.appendChild(text);
  return node;
}

export function appendArray(nodes: Element[], parentNode: Element): void {
  nodes.forEach(node => {
    parentNode.appendChild(node);
  });
}

export function appendFilepaths(files: { [key: string]: XmlFile }, parentNode: Element, xmlDoc: XMLDocument): void {
  Object.keys(files).forEach(key => {
    parentNode.appendChild(
      createNodeFromObject({ filename: files[key].filepath }, xmlDoc, key)
    );
  });
}
