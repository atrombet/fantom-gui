import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ItemType } from '@enums';
import { Item } from '@interfaces';
import { ItemService } from '../../../services';

@Component({
  selector: 'entities-tab',
  templateUrl: './entities-tab.component.html',
  styleUrls: ['./entities-tab.component.scss']
})
export class EntitiesTabComponent implements OnInit, OnDestroy {
  public entities$: Observable<Item[]>;
  public selectedEntityId: number;

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

  public addEntity(): void {
    this.service.addItem(ItemType.Entity);
  }

  public updateEntityName(name: string, id: number): void {
    this.service.updateItemName(ItemType.Entity, id, name);
  }

  public duplicateEntity(entity: Item): void {
    this.service.duplicateItem(entity);
  }

  public deleteEntity(id: number): void {
    this.service.deleteItem(ItemType.Entity, id);
  }

  public fetchObjectsForEntity(entityId: number): Observable<Item[]> {
    return this.service.objects$(entityId);
  }

  public addObject(entityId: number): void {
    this.service.addItem(ItemType.Object, entityId);
  }

  public updateObjectName(name: string, id: number): void {
    this.service.updateItemName(ItemType.Object, id, name);
  }

  public duplicateObject(object: Item): void {
    this.service.duplicateItem(object);
  }

  public deleteObject(id: number): void {
    this.service.deleteItem(ItemType.Object, id);
  }

  public goToObject(object: Item): void {
    this.objectSelected.emit(object);
  }

}
