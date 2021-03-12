import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcRenderer } from 'electron';
import { BehaviorSubject, forkJoin, of, from } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ItemService } from './item.service';
import { SimulationFormService } from './simulation-form.service';
import { Item, XmlFile } from '@interfaces';
import { appendSimXMLNode } from '@functions';
import format from 'xml-formatter';
import convert from 'xml-js';
import { EntityImporter, EntityXmlGenerator, EnvironmentImporter, EnvironmentXmlGenerator } from '@classes';
import { CONVERTER_OPTIONS } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class XmlService {
  public xml$ = new BehaviorSubject<string>(null);
  public entityXmlGen = new EntityXmlGenerator();
  public envXmlGen = new EnvironmentXmlGenerator();
  public environmentImporter: EnvironmentImporter;
  public entityImporter: EntityImporter;
  public renderer: IpcRenderer;

  constructor(private simulationService: SimulationFormService, private itemService: ItemService, private electron: ElectronService) {
    this.renderer = this.electron.ipcRenderer;
  }

  /**********************************
   * XML Import
   **********************************/

  public importXml(files: any): void {
    // Initialize the importers with the imported files.
    this.environmentImporter = new EnvironmentImporter(files);
    this.entityImporter = new EntityImporter(files);
    // Grab the simulation name as the first segment of any file's path.
    const simName = files[0].webkitRelativePath.split('/')[0];
    from(files[0].text()).pipe(
      tap((text: string) => {
        const { simulation, environment, entity } = convert.xml2js(text, CONVERTER_OPTIONS)['root'];
        // Import the simulation data.
        this.importSimData(simName, simulation);
        // Import the environment data.
        this.importEnvironmentData(environment);
        // Import the entity data.
        this.importEntityData(entity);
      })
    ).subscribe();
  }

  private importSimData(simulation_name: string, simulation: any): void {
    const maximum_time_sec = simulation.maximum_time_sec._;
    this.simulationService.patchForm({ simulation_name, maximum_time_sec });
  }

  private importEnvironmentData(environment: any): void {
    if (!Array.isArray(environment)) {
      environment = [ environment ];
    }
    const envItems: Item[] = environment.map((env, index) => {
      return this.environmentImporter.createEnvItem(env, index + 1);
    });
    this.itemService.setEnvironments(envItems);
  }

  private importEntityData(entity: any): void {
    if (!Array.isArray(entity)) {
      entity = [ entity ];
    }
    const entityItems: Item[] = entity.map((ent, index) => {
      return this.entityImporter.createEntityItem(ent, index + 1);
    });
    this.itemService.setEntitiesAndObjects(entityItems);
  }

  /**********************************
   * XML Export
   **********************************/

  public exportXml(): void {
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
    const allEnvironmentFiles: XmlFile[] = this.envXmlGen.appendEnvXMLNodes(environments, xmlDoc, rootNode, simulation_name);
    additionalFiles.push(...allEnvironmentFiles);

    // Create and append entity nodes.
    const allEntityFiles: XmlFile[] = this.entityXmlGen.appendEntXMLNodes(entities, xmlDoc, rootNode, simulation_name);
    additionalFiles.push(...allEntityFiles);

    // Create serializer.
    const serializer = new XMLSerializer();
    // Serialize the xml doc to string.
    const xmlString = format(serializer.serializeToString(xmlDoc), { collapseContent: true });

    this.xml$.next(xmlString);

    this.renderer.send('EXPORT_XML', [
      { filepath: `./${simulation_name}/${simulation_name}.xml`, content: xmlString },
      ...additionalFiles
    ]);
  }
}
