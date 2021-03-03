import { XmlFile } from '../interfaces';
import format from 'xml-formatter';

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

export function create1DTableFile(rows: string[], data: string[]): string {
  // Create the document.
  const doc = document.implementation.createDocument(null, 'table', null);
  // Create the root node called <table>.
  const tableNode = doc.querySelector('table');

  // Create and append the dimension node.
  const dimNode = createNodeFromValue(1, doc, 'dimension');
  tableNode.appendChild(dimNode);

  // Create and append the n_row node.
  const nRow = rows.length;
  const nRowNode = createNodeFromValue(nRow, doc, 'n_row');
  tableNode.appendChild(nRowNode);

  // Create and append the row_breakpoint node.
  const rowBreakpointStr = rows.join(',');
  const rowBreakpointNode = createNodeFromValue(rowBreakpointStr, doc, 'row_breakpoint');
  tableNode.appendChild(rowBreakpointNode);

  // Create and append the data node.
  const dataStr = data.join(',');
  const dataNode = createNodeFromValue(dataStr, doc, 'data');
  tableNode.appendChild(dataNode);

  // Create serializer.
  const serializer = new XMLSerializer();
  // Serialize the xml doc to string.
  const xmlString = format(serializer.serializeToString(doc));

  return xmlString;
}

export function create2DTable(rows: string[], columns: string[], data: any[]): string {
  // Create the document.
  const doc = document.implementation.createDocument(null, 'table', null);
  // Create the root node called <table>.
  const tableNode = doc.querySelector('table');

  // Create and append the dimension node.
  const dimNode = createNodeFromValue(2, doc, 'dimension');
  tableNode.appendChild(dimNode);

  // Create and append the n_row node.
  const nRow = rows.length;
  const nRowNode = createNodeFromValue(nRow, doc, 'n_row');
  tableNode.appendChild(nRowNode);

  // Create and append the row_breakpoint node.
  const rowBreakpointStr = rows.join(',');
  const rowBreakpointNode = createNodeFromValue(rowBreakpointStr, doc, 'row_breakpoint');
  tableNode.appendChild(rowBreakpointNode);

  // Create and append the n column node.
  const nColumn = columns.length;
  const nColumnNode = createNodeFromValue(nColumn, doc, 'n_column');
  tableNode.appendChild(nColumnNode);

  // Create and append the columnBreakpointNode
  const columnBreakpointStr = columns.join(',');
  const columnBreakpointNode = createNodeFromValue(columnBreakpointStr, doc, 'column_breakpoint');
  tableNode.appendChild(columnBreakpointNode);

  // Create and append the data node.
  const dataStr = data.reduce((str, dataRow) => `${str}\n${dataRow.join(',')}`);
  const dataNode = createNodeFromValue(dataStr, doc, 'data');
  tableNode.appendChild(dataNode);

  // Create serializer.
  const serializer = new XMLSerializer();
  // Serialize the xml doc to string.
  const xmlString = format(serializer.serializeToString(doc));

  return xmlString;
}
