import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcRenderer } from 'electron';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { ItemService } from './item.service';
import { SimulationFormService } from './simulation-form.service';
import { Item, XmlFile } from '@interfaces';
import { appendSimXMLNode, appendEnvXMLNodes } from '@functions';
import format from 'xml-formatter';
import { EntityXmlGenerator } from '@classes';

@Injectable({
  providedIn: 'root'
})
export class XmlService {
  public xml$ = new BehaviorSubject<string>(null);
  public entityXmlGen = new EntityXmlGenerator();
  public renderer: IpcRenderer;

  constructor(private simulationService: SimulationFormService, private itemService: ItemService, private electron: ElectronService) {
    this.renderer = this.electron.ipcRenderer;
  }

  public exportXml(): void {
    console.log('Begin Export.');
    forkJoin({
      simulation: of(this.simulationService.simForm.value),
      environments: this.itemService.environments$.pipe(take(1)),
      entities: this.itemService.entities$.pipe(take(1)),
      objects: this.itemService.allObjects$.pipe(take(1))
    }).pipe(
      take(1),
      tap(({ simulation, environments, entities, objects }) => {
        // Next the objects under their parent entities.
        entities.map((entity: Item) => {
          entity.objects = objects.filter(object => object.parentId === entity.id);
        });
        this.generateXml({ simulation, environments, entities });
      })
    ).subscribe();
  }

  /**********************************
   * XML Generation
   **********************************/

  public generateXml({ simulation, environments, entities }): void {
    const additionalFiles: XmlFile[] = [];

    // Create xml doc.
    const xmlDoc = document.implementation.createDocument(null, 'root', null);
    // Grab the root node.
    const rootNode = xmlDoc.querySelector('root');

    const { simulation_name, maximum_time_sec } = simulation;
    // Create simulation node and append to root.
    appendSimXMLNode({ maximum_time_sec }, xmlDoc, rootNode);

    // Create and append environment nodes.
    appendEnvXMLNodes(environments, xmlDoc, rootNode);

    // Create and append entity nodes.
    const allEntityFiles: XmlFile[] = this.entityXmlGen.appendEntXMLNodes(entities, xmlDoc, rootNode, simulation_name);
    additionalFiles.push(...allEntityFiles);

    // Create serializer.
    const serializer = new XMLSerializer();
    // Serialize the xml doc to string.
    const xmlString = format(serializer.serializeToString(xmlDoc));

    this.xml$.next(xmlString);

    this.renderer.send('EXPORT_XML', [
      { filepath: `${simulation_name}/${simulation_name}.xml`, content: xmlString },
      ...additionalFiles
    ]);


    // Log the formatted xml string.
    // console.log(xmlString);
  }
}
