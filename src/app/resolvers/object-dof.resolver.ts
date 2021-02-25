import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ItemService } from '@services';
import { Item } from '@interfaces';

@Injectable()
export class ObjectDofResolver implements Resolve<number> {
  constructor(private service: ItemService) {}

  public resolve(route: ActivatedRouteSnapshot): number {
    const id = parseInt(route.params.id, 10);
    const type = route.data.itemType;
    const item: Item = this.service.getItemById(type, id);
    return item
      .sections
      .find(sec => sec.name === 'meta')
      .subsections[0]
      .form
      .get('allow_six_dof')?.value || null;
  }
}
