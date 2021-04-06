import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { propSourceFormGroupFactory } from '@constants';
import { ItemService } from '@services';

@Component({
  selector: 'prop-general',
  templateUrl: './prop-general.component.html'
})
export class PropGeneralComponent extends SubsectionBaseComponent implements AfterViewInit {
  public selectedPropSourceIndex: number = null;
  public sources: FormArray;

  constructor(protected route: ActivatedRoute, private itemService: ItemService) {
    super(route);
  }

  /**
   * Angular lifecycle hook After View Init.
   */
  public ngAfterViewInit(): void {
    this.sources = this.form.get('sources') as FormArray;
  }

  /**
   * Adds a new propulsion source to the list of sources.
   */
  public addPropSource(): void {
    const nextSourceNumber = this.sources.controls.length + 1;
    this.sources.push(propSourceFormGroupFactory(`hardware_${('000' + nextSourceNumber).slice(-3)}`));
  }

  /**
   * Removes a propulsion source from the list.
   */
  public renamePropSource(name: string, nameControl: FormControl): void {
    nameControl.patchValue(name);
  }

  /**
   * Duplicates a given prop source.
   * @param formGroup - The form group of the prop source's values.
   */
  public duplicatePropSource(formGroup: FormGroup): void {
    const newFormGroup = propSourceFormGroupFactory();
    const val = { ...formGroup.value };
    val.name = this.itemService.getDupItemName(this.sources.value, val);
    newFormGroup.patchValue(val);
    this.itemService.patchRowFormValues(val, newFormGroup, 'table_1');
    this.itemService.patchRowFormValues(val, newFormGroup, 'table_2');
    this.sources.push(newFormGroup);
  }

  /**
   * Removes a prop source from the list.
   * @param index - Index of the prop source in the list.
   */
  public removePropSource(index: number): void {
    this.sources.removeAt(index);
  }

  /**
   * Sets the selected index to that of the clicked prop source.
   * @param index - Index of the prop source in the list.
   */
  public propSourceSelected(index: number): void {
    this.selectedPropSourceIndex = index;
  }
}
