import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ItemType } from '@enums';
import { Item } from '@interfaces';
import { ItemService } from '../../../services';

@Component({
  selector: 'entities-tab',
  templateUrl: './entities-tab.component.html'
})
export class EntitiesTabComponent implements OnInit, OnDestroy {
  public entities$: Observable<Item[]>;
  public selectedObjectId: number;

  @Output() public objectSelected: EventEmitter<Item> = new EventEmitter<Item>();

  private subs: Subscription = new Subscription();

  constructor(private service: ItemService) { }

  /********************************
   * Angular Life cycle hooks
   ********************************/

  /**
   * Angular On Init Lifecycle hook
   */
  public ngOnInit(): void {
    this.entities$ = this.service.entities$;
  }

  /**
   * Angular On Destroy Lifecycle hook
   */
  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /********************************
   * Public Methods
   ********************************/

  /**
   * Calls the item service to add an entity.
   */
  public addEntity(): void {
    this.service.addItem(ItemType.Entity);
  }

  /**
   * Calls the item service to rename an entity.
   * @param name - The new name of the entity.
   * @param id - The ID of the entity to rename.
   */
  public updateEntityName(name: string, id: number): void {
    this.service.updateItemName(ItemType.Entity, id, name);
  }

  /**
   * Calls the item service to duplicate an entity and all of its objects.
   * @param entity - The Entity to duplicate.
   */
  public duplicateEntity(entity: Item): void {
    this.service.duplicateItem(entity);
  }

  /**
   * Calls the item service to delete an entity.
   * @param id - The ID of the entity to delete.
   */
  public deleteEntity(id: number): void {
    this.service.deleteItem(ItemType.Entity, id);
  }

  /**
   * Fetches all the objects for a given entity.
   * @param entityId - The ID of the entity to fetch objects for.
   */
  public fetchObjectsForEntity(entityId: number): Observable<Item[]> {
    return this.service.objects$(entityId);
  }

  /**
   * Calls the item service to add a new object.
   * @param entityId - The ID of the entity thenew object should belong to.
   */
  public addObject(entityId: number): void {
    this.service.addItem(ItemType.Object, entityId);
  }

  /**
   * Calls the item service to updates an object's name.
   * @param name - The new name of the object.
   * @param id - The ID of the object to update.
   */
  public updateObjectName(name: string, id: number): void {
    this.service.updateItemName(ItemType.Object, id, name);
  }

  /**
   * Calls the item service to duplicate an object.
   * @param object - The object to duplicate.
   */
  public duplicateObject(object: Item): void {
    this.service.duplicateItem(object);
  }

  /**
   * Calls the item service to delete an object.
   * @param id - The ID of the object to delete.
   */
  public deleteObject(id: number): void {
    this.service.deleteItem(ItemType.Object, id);
  }

  /**
   * Emits an event indicating that an object has been selected.
   * @param object - The object that has been selected.
   */
  public goToObject(object: Item): void {
    this.objectSelected.emit(object);
    this.selectedObjectId = object.id;
  }

  /**
   * Resets the selected object id.
   */
  public resetSelected(): void {
    this.selectedObjectId = null;
  }
}
