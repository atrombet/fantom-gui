import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ItemService } from './item.service';
import { SimulationFormService } from './simulation-form.service';
import { Item } from '@interfaces';
import {
  appendSimXMLNode,
  appendEnvXMLNodes
} from '@functions';
import format from 'xml-formatter';

@Injectable({
  providedIn: 'root'
})
export class XmlService {
  public xml$ = new BehaviorSubject<string>(null);
  constructor(private simulationService: SimulationFormService, private itemService: ItemService, private electron: ElectronService) { }

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
    // Create xml doc.
    const xmlDoc = document.implementation.createDocument(null, 'root', null);
    // Grab the root node.
    const rootNode = xmlDoc.querySelector('root');

    // Create simulation node and append to root.
    appendSimXMLNode(simulation, xmlDoc, rootNode);

    // Create and append environment nodes.
    appendEnvXMLNodes(environments, xmlDoc, rootNode);

    // Create serializer.
    const serializer = new XMLSerializer();
    // Serialize the xml doc to string.
    const xmlString = format(serializer.serializeToString(xmlDoc));

    this.xml$.next(xmlString);

    // Log the formatted xml string.
    // console.log(xmlString);
  }
}
