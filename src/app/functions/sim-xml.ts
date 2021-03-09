import { createNodeFromObject } from './xml-export-helpers';

export function appendSimXMLNode(simulation: any, xmlDoc: XMLDocument, rootNode: Element): void {
  rootNode.appendChild(createNodeFromObject(simulation, xmlDoc, 'simulation'));
}
