import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';
import { map, switchMap } from 'rxjs/operators';
import { ItemService } from '@services';
import { Item } from '@interfaces';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'meta-general',
  templateUrl: './meta-general.component.html'
})
export class MetaGeneralComponent extends SubsectionBaseComponent implements OnInit {
  public objectId: number;

  public dofOptions: SelectOption[] = [
    { value: 1, viewValue: '6' },
    { value: 2, viewValue: '3 + 3' },
    { value: 3, viewValue: '3' }
  ];

  public parentObjectOptions: SelectOption[];

  public solverOptions: SelectOption[] = [
    { value: 1, viewValue: 'Runge-Kutta 4th Order' }
  ];

  constructor(protected route: ActivatedRoute, private itemService: ItemService) {
    super(route);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    // Subscribe to possible parent objects for this object.
    this.subs.add(
      combineLatest([
        this.route.data,
        this.route.params
      ]).pipe(
        switchMap(([ data, params ]) => {
          this.objectId = parseInt(params.id, 10);
          return this.itemService.objects$(data.parentId);
        }),
        map((objects: Item[]) => {
          return objects.map(object => {
            return { value: object.id, viewValue: object.name } as SelectOption;
          });
        })
      ).subscribe((objectOptions: SelectOption[]) => {
        this.parentObjectOptions = objectOptions;
      })
    );
  }
}
