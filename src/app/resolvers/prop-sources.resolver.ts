import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ItemService } from '@services';
import { Item } from '@interfaces';
import { FormArray } from '@angular/forms';

@Injectable()
export class PropSourcesResolver implements Resolve<FormArray> {
  constructor(private service: ItemService) {}

  public resolve(route: ActivatedRouteSnapshot): FormArray {
    const id = parseInt(route.params.id, 10);
    const type = route.data.itemType;
    const item: Item = this.service.getItemById(type, id);
    return item
      .sections
      .find(sec => sec.name === 'propulsion')
      .subsections[0]
      .form
      .get('sources') as FormArray || null;
  }
}
