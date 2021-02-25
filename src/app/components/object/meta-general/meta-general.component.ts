import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { SelectOption } from '@interfaces';
import { tap, switchMap } from 'rxjs/operators';
import { ItemService } from '@services';
import { Item } from '@interfaces';
import { combineLatest } from 'rxjs';
import { ItemType } from '../../../enums';

@Component({
  selector: 'meta-general',
  templateUrl: './meta-general.component.html'
})
export class MetaGeneralComponent extends SubsectionBaseComponent implements OnInit, AfterViewInit {
  public objectId: number;

  public parentObjectOptions: SelectOption[];
  public localEnvOptions: SelectOption[];

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
        switchMap((objects: Item[]) => {
          this.parentObjectOptions = [
            { value: 'none', viewValue: 'None' },
            ...objects.map(object => {
              return { value: object.id, viewValue: object.name } as SelectOption;
            })
          ];
          return this.itemService.environments$;
        }),
        tap((environments: Item[]) => {
          this.localEnvOptions = [
            ...environments.map(env => {
              return { value: env.id, viewValue: env.name } as SelectOption;
            })
          ];
        })
      ).subscribe()
    );
  }

  public ngAfterViewInit(): void {
    this.subs.add(
      this.form.get('allow_six_dof').valueChanges.subscribe(value => {
        if (value) {
          this.enableSectionsIn6Dof();
        } else {
          this.disableSectionsIn3Dof();
        }
      })
    );
  }

  private disableSectionsIn3Dof(): void {
    // Disable Mass Properties
    this.itemService.updateItemSectionVis(
      ItemType.Object,
      this.objectId,
      [ { name: 'mass', isDisabled: true } ]
    );
  }

  private enableSectionsIn6Dof(): void {
    // Enable Mass Properties
    this.itemService.updateItemSectionVis(
      ItemType.Object,
      this.objectId,
      [ { name: 'mass', isDisabled: false } ]
    );
  }
}
