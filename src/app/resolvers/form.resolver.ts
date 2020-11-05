import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ItemService } from '@services';
import { Item } from '@interfaces';

@Injectable()
export class FormResolver implements Resolve<FormGroup> {
  constructor(private service: ItemService) {}

  public resolve(route: ActivatedRouteSnapshot): FormGroup {
    const id = parseInt(route.params.id, 10);
    const type = route.data.tab;
    const item: Item = this.service.getItemById(type, id);
    const [ section, subsection ] = route.url[0].path.split('_');
    return item
      .sections
      .find(sec => sec.name === section)
      .subsections
      .find(subsec => subsec.name === subsection)
      .form
      || null;
  }
}
