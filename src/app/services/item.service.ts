import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item, AppState, Section, Subsection } from '@interfaces';
import { ItemType } from '@enums';
import { ENVIRONMENT_SECTIONS, OBJECT_SECTIONS, propSourceFormGroupFactory, segmentFormGroupFactory } from '@constants';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // The main state model for the application.
  private state: AppState;

  // Returns the stored environment behavior subject as an observable of Item[] which is nice to work with on templates.
  public get environments$(): Observable<Item[]> {
    return this.state[ItemType.Environment].data.pipe(
      map((envMap: Map<number, Item>) => {
        return Array.from(envMap.values());
      })
    );
  }

  // Returns the stored entities behavior subject as an observable of Item[] which is nice to work with on templates.
  public get entities$(): Observable<Item[]> {
    return this.state[ItemType.Entity].data.pipe(
      map((entityMap: Map<number, Item>) => {
        return Array.from(entityMap.values());
      })
    );
  }

  // Returns the stored objects without filtering by parent entity id.
  public get allObjects$(): Observable<Item[]> {
    return this.state[ItemType.Object].data.pipe(
      map((objectMap: Map<number, Item>) => {
        return Array.from(objectMap.values());
      })
    );
  }

  // Returns the stored objects behavior subject as an observable of Item[] which is nice to work with on templates.
  public objects$(entityId: number): Observable<Item[]> {
    return this.state[ItemType.Object].data.pipe(
      map((objectMap: Map<number, Item>) => {
        return Array.from(objectMap.values()).filter(obj => obj.parentId === entityId);
      })
    );
  }

  constructor(private fb: FormBuilder) {
    this.initialize();
  }

  /**********************************
   * Public Methods
   **********************************/

  /**
   * Intializes / Resets the state of the app.
   */
  public initialize(): void {
    this.state = {
      [ItemType.Environment]: {
        // Store all environments as a map to make them very easy to access by id.
        data: new BehaviorSubject<Map<number, Item>>(new Map<number, Item>()),
        // Store the id that was last used to create an environment.
        lastId: 0
      },
      [ItemType.Entity]: {
        // Store all environments as a map to make them very easy to access by id.
        data: new BehaviorSubject<Map<number, Item>>(new Map<number, Item>()),
        // Store the id that was last used to create an entity.
        lastId: 0
      },
      [ItemType.Object]: {
        // Store all objects as a map to make them very easy to access by id.
        data: new BehaviorSubject<Map<number, Item>>(new Map<number, Item>()),
        // Store the id that was last used to create an object.
        lastId: 0
      }
    };
  }

  public resetState(): void {
    this.state[ItemType.Environment].data.next(new Map<number, Item>());
    this.state[ItemType.Environment].lastId = 0;
    this.state[ItemType.Entity].data.next(new Map<number, Item>());
    this.state[ItemType.Entity].lastId = 0;
    this.state[ItemType.Object].data.next(new Map<number, Item>());
    this.state[ItemType.Object].lastId = 0;
  }

  /**
   * Takes an array of environments and replaces the environment state with the new data.
   * @param envs - Environments to set as state.
   */
  public setEnvironments(envs: Item[]): void {
    // Get the last id as the highest id in the set of envs.
    const maxId = Math.max(...envs.map(env => env.id));
    // Create a Map from the env array.
    const envMap: Map<number, Item> = new Map(envs.map(env => {
      return [ env.id, env ];
    }));

    // Patch values into state.
    this.state[ItemType.Environment].data.next(envMap);
    this.state[ItemType.Environment].lastId = maxId;
  }

  public setEntitiesAndObjects(entities: Item[]): void {
    // Entities
    const maxEntId = Math.max(...entities.map(ent => ent.id));
    const entMap: Map<number, Item> = new Map(entities.map(ent => {
      const { id, type, name } = ent;
      return [ id, { id, type, name } ];
    }));
    // Patch entity values into state.
    this.state[ItemType.Entity].data.next(entMap);
    this.state[ItemType.Entity].lastId = maxEntId;

    // Objects
    const objArr = [];
    entities.forEach(entity => {
      objArr.push(...entity.objects);
    });
    const objMap: Map<number, Item> = new Map(objArr.map((obj, index) => {
      return [ index + 1, obj ];
    }));
    // Patch object values into state.
    this.state[ItemType.Object].data.next(objMap);
    this.state[ItemType.Object].lastId = objArr.length;
  }

  /**
   * Returns an item given its type and id.
   * @param type - The ItemType of the data to access.
   * @param id - The id if the desired item.
   */
  public getItemById(type: ItemType, id: number): Item {
    return this.state[type].data.getValue().get(id);
  }

  /**
   * Adds an item to the list of the specified type and auto-generates the right name.
   * @param type - The type of item to add.
   */
  public addItem(type: ItemType, parentId?: number): void {
    const newMap = this.cloneMap(type);
    const newId = this.state[type].lastId + 1;
    const nameDigit = type !== ItemType.Object ? newId : this.getObjectDefaultNameDigit(newMap, parentId);
    newMap.set(newId, {
      id: newId,
      type,
      parentId,
      name: `${type}_${('000' + nameDigit).slice(-3)}`,
      sections: this.getSectionsForType(type)
    });
    this.state[type].data.next(newMap);
    this.state[type].lastId = newId;
  }

  /**
   * Updates the name of an item.
   * @param type - The type of the item.
   * @param id - The id of the item.
   * @param name - The new name of the item.
   */
  public updateItemName(type: ItemType, id: number, name: string): void {
    const newMap = this.cloneMap(type);
    const item: Item = newMap.get(id);
    item.name = name;
    newMap.set(id, item);
    this.state[type].data.next(newMap);
  }

  /**
   * Duplicates the given item.
   * @param item - The item to duplicate.
   */
  public duplicateItem(item: Item): void {
    const newMap = this.cloneMap(item.type);
    const items: Item[] = Array.from(newMap.values());
    const newName = this.getDupItemName(items, item);
    const newId = this.state[item.type].lastId + 1;
    const newItem: Item = {
      ...item,
      id: newId,
      name: newName,
      sections: this.getSectionsForType(item.type)
    };
    this.patchFormValuesToNewItem(item, newItem);
    newMap.set(newId, newItem);
    this.state[item.type].data.next(newMap);
    this.state[item.type].lastId = newId;
    if (item.type === ItemType.Entity) {
      // Duplicate the objects from the existing entity to the new entity.
      this.duplicateManyObjects(item.id, newId);
    }
  }

  /**
   * Returns the new name of an item being duplicated.
   * @param items - All the items in the set from which one is being duplicated.
   * @param item - The item being duplicated.
   */
  public getDupItemName(items, item): string {
    const nameParts = item.name.split('-');
    const max = this.getHighestDashNumber(items, nameParts[0]);
    const newName = max >= 0 ? `${nameParts[0]}-${max + 1}` : `${item.name}-1`;
    return newName;
  }

  /**
   * Duplicates all objects from an existing entity to a new entity.
   * @param entityIdToDup - The ID of the entity whose objects are being duplicated.
   * @param newEntityId - The ID of the new entity to add the duplicated objects to.
   */
  public duplicateManyObjects(entityIdToDup: number, newEntityId: number): void {
    const newMap = this.cloneMap(ItemType.Object);
    const objectsToDup = Array.from(newMap.values()).filter(obj => obj.parentId === entityIdToDup);
    if (!!objectsToDup.length) {
      objectsToDup.forEach((obj: Item) => {
        const newId = this.state[ItemType.Object].lastId + 1;
        const newObj: Item = {
          ...obj,
          id: newId,
          parentId: newEntityId,
          sections: this.getSectionsForType(ItemType.Object)
        };
        this.patchFormValuesToNewItem(obj, newObj);
        newMap.set(newId, newObj);
        this.state[ItemType.Object].lastId = newId;
      });
      this.state[ItemType.Object].data.next(newMap);
    }
  }

  /**
   * Deletes an item of the specified type.
   * @param type - The type of item to delete.
   * @param id - The id of the item to delete.
   */
  public deleteItem(type: ItemType, id: number): void {
    const newMap = this.cloneMap(type);
    newMap.delete(id);
    this.state[type].data.next(newMap);
  }

  /**
   * Updates a set of subsections
   * @param type - The type of the item to search for subsections.
   * @param id - The id of the item.
   * @param subsection - The names and disabled states of the subsections to update.
   * @param parentSectionName - The name of the parent section.
   */
  public updateItemSubsVis(
    type: ItemType,
    id: number,
    subsection: { name: string, isDisabled: boolean}[],
    parentSectionName: string
  ): void {
    const newMap = this.cloneMap(type);
    const item: Item = newMap.get(id);
    const section = item.sections.find(s => s.name === parentSectionName);
    if (section) {
      subsection.forEach(sub => {
        const subToDisable = section.subsections.find(s => s.name === sub.name);
        subToDisable.isDisabled = sub.isDisabled;
      });
    }
    newMap.set(id, item);
    this.state[type].data.next(newMap);
  }

  /**
   * Updates a set of sections
   * @param type - The type of the item to search for sections.
   * @param id - The id of the item.
   * @param subsection - The names and disabled states of the sections to update.
   */
  public updateItemSectionVis(type: ItemType, id: number, sections: { name: string, isDisabled: boolean}[]): void {
    const newMap = this.cloneMap(type);
    const item: Item = newMap.get(id);
    sections.forEach(sec => {
      const sectionToDisable = item.sections.find(s => s.name === sec.name);
      sectionToDisable.isDisabled = sec.isDisabled;
    });
    newMap.set(id, item);
    this.state[type].data.next(newMap);
  }

  /**
   * Iterates over a set of rows and creates new FormGroups to push to a 'rows' FormArray.
   */
   public patchRowFormValues(table, form, rowKey = 'rows'): void {
    const rows = table[rowKey];
    rows.forEach(row => {
      form.controls[rowKey].push(
        Object.keys(row).reduce((group, key) => {
          group.addControl(key, this.fb.control(row[key]));
          return group;
        }, new FormGroup({}))
      );
    });
  }

  /**********************************
   * Private Methods
   **********************************/

  /**
   * Clones the state map of the given type.
   * @param type - The type of the map to clone.
   */
  private cloneMap(type: ItemType): Map<number, Item> {
    return new Map(this.state[type].data.getValue());
  }

  /**
   * Returns the sections for a particular item type.
   * @param type - ItemType to return sections for.
   */
  private getSectionsForType(type: ItemType): any {
    switch (type) {
      case ItemType.Environment: return ENVIRONMENT_SECTIONS();
      case ItemType.Entity: return null;
      case ItemType.Object: return OBJECT_SECTIONS();
    }
  }

  /**
   * Get the digit to patch into the name of a new object.
   * @param objMap - A clone of the object data.
   * @param entityId - The ID of the parent entity with the objects to review.
   */
  private getObjectDefaultNameDigit(objMap: Map<number, Item>, entityId: number): number {
    // Get objects for the entity.
    const entityObjs: Item[] = Array.from(objMap.values()).filter(obj => obj.parentId === entityId);
    // Return the number of objects this entity has + 1.
    return entityObjs.length + 1;
  }

  /**
   * Looks through a set of items to determine the highest enumerated part of their names.
   * @param items - The items to search through.
   * @param namePart - The part of the item names to look for.
   * @param separator - The separating character between namePart and the enumerated part.
   */
  private getHighestDashNumber(items: Item[], namePart: string, separator: string = '-'): number {
    const itemNames: string[] = items.map(i => i.name);
    // Find the highest dash number. Ex: [env-1, env-4] => highest dash number is 4.
    const max = Math.max(
      ...itemNames
        .filter(name => name.indexOf(namePart) === 0)
        .map(name => name.split(separator)[1])
        .filter(numStr => !!numStr)
        .map(numStr => parseInt(numStr, 10))
    );
    return max;
  }

  /**
   * Patches the form values of each section and subsection of one item to a new item.
   * @param item - The item with the form values.
   * @param newItem - The item to patch the old values to.
   */
  private patchFormValuesToNewItem(item: Item, newItem: Item): void {
    if (!!item.sections) {
      item.sections.forEach((section: Section) => {
        section.subsections.forEach((sub: Subsection) => {
          const val = sub.form.value;
          const newSub: Subsection = newItem
            .sections
            .find(sec => sec.name === section.name)
            .subsections
            .find(subsec => subsec.name === sub.name);
          newSub.form.patchValue(val);
          if (val.hasOwnProperty('rows')) {
            this.patchRowFormValues(val, newSub.form);
          } else if (val.hasOwnProperty('force_1')) {
            this.patchAeroFormValues(val, newSub.form);
          } else if (val.hasOwnProperty('sources')) {
            this.patchPropSources(val, newSub.form);
          } else if (val.hasOwnProperty('segments')) {
            this.patchSegments(val, newSub.form);
          }
        });
      });
    }
  }

  /**
   * Patches Aerodynamics coefficient data to the new item's subsection form.
   * @param coefs - Aerodynamics coefficients.
   * @param form - the form to patch data to.
   */
  private patchAeroFormValues(coefs, form): void {
    Object.keys(coefs).forEach(key => {
      const coef = coefs[key];
      if (coef.size === 1) {
        this.patchRowFormValues(coef.table_1D, form.get(key).get('table_1D'));
      } else if (coef.size === 2) {
        this.patch2DTable(coef.table_2D, form.get(key).get('table_2D'));
      }
    });
  }

  /**
   * Patches a 2D table
   */
  private patch2DTable(table, form): void {
    const { columns, rows, data } = table;
    columns.forEach(val => {
      form.get('columns').push(this.fb.control(val));
    });
    rows.forEach(val => {
      form.get('rows').push(this.fb.control(val));
    });
    data.forEach(dat => {
      form.get('data').push(this.fb.array([ ...dat.map(_ => this.fb.control(_)) ]));
    });
  }

  /**
   * Patches in prop sources.
   */
  public patchPropSources({ sources }, form): void {
    sources.forEach(source => {
      const group = propSourceFormGroupFactory();
      group.patchValue(source);
      this.patchRowFormValues(source, group, 'table_1');
      this.patchRowFormValues(source, group, 'table_2');
      form.get('sources').push(group);
    });
  }

  /**
   * Patches in segments.
   */
  public patchSegments({ segments }, form): void {
    segments.forEach(segment => {
      const group = segmentFormGroupFactory();
      group.patchValue(segment);
      Object.keys(segment.active_propulsion_sources).forEach(key => {
        const apsGroup = group.get('active_propulsion_sources') as FormGroup;
        apsGroup.addControl(key, this.fb.control(segment.active_propulsion_sources[key]));
      });
      group.get('active_propulsion_sources').patchValue(segment.active_propulsion_sources);
      this.patchRowFormValues(segment.gnc, group.get('gnc'));
      form.get('segments').push(group);
    });
  }
}
