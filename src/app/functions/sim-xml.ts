import { createNodeFromObject } from './xml-helpers';

export function appendSimXMLNode(simulation: any, xmlDoc: XMLDocument, rootNode: Element): void {
  rootNode.appendChild(createNodeFromObject(simulation, xmlDoc, 'simulation'));
}
