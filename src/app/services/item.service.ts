import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item, AppState } from '@interfaces';
import { ItemType } from '@enums';
import { ENVIRONMENT_SECTIONS, OBJECT_SECTIONS } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // The main state model for the application.
  private state: AppState = {
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

  // Returns the stored objects behavior subject as an observable of Item[] which is nice to work with on templates.
  public objects$(entityId: number): Observable<Item[]> {
    return this.state[ItemType.Object].data.pipe(
      map((objectMap: Map<number, Item>) => {
        return Array.from(objectMap.values()).filter(obj => obj.parentId === entityId);
      })
    );
  }

  /**********************************
   * Public Methods
   **********************************/

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
    const nameParts = item.name.split('-');
    const max = this.getHighestDashNumber(items, nameParts[0]);
    const newName = max >= 0 ? `${nameParts[0]}-${max + 1}` : `${item.name}-1`;
    const newId = this.state[item.type].lastId + 1;
    const newItem: Item = { ...item, id: newId, name: newName };
    newMap.set(newId, newItem);
    this.state[item.type].data.next(newMap);
    this.state[item.type].lastId = newId;
    if (item.type === ItemType.Entity) {
      // Duplicate the objects from the existing entity to the new entity.
      this.duplicateManyObjects(item.id, newId);
    }
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
        newMap.set(newId, {
          ...obj,
          id: newId,
          parentId: newEntityId
        });
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
    // Find the highest dash number.
    const max: number = !!entityObjs.length ? this.getHighestDashNumber(entityObjs, ItemType.Object, '_') : 0;
    // Return highest dash number +1.
    return max + 1;
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
}
