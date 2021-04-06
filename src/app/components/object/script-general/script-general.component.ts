import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubsectionBaseComponent } from '@components/shared';
import { segmentFormGroupFactory } from '@constants';
import { ItemService } from '@services';

@Component({
  selector: 'script-general',
  templateUrl: './script-general.component.html'
})
export class ScriptGeneralComponent extends SubsectionBaseComponent implements AfterViewInit {
  public selectedSegmentIndex: number = null;
  public segments: FormArray;
  public propSources: string[];
  public allowSixDof: boolean;

  constructor(protected route: ActivatedRoute, private itemService: ItemService) {
    super(route);
  }

  /**
   * Angular lifecycle hook After View Init.
   */
  public ngAfterViewInit(): void {
    this.segments = this.form.get('segments') as FormArray;
    this.propSources = this.data.propSources?.value.map(propSource => propSource.name);
    this.allowSixDof = this.data.sixDof;
  }

  /**
   * Adds a new segment to the list of sources.
   */
  public addSegment(): void {
    const nextSegmentNumber = this.segments.controls.length + 1;
    this.segments.push(segmentFormGroupFactory(`segment_${('000' + nextSegmentNumber).slice(-3)}`))
  }

  /**
   * Removes a segment from the list.
   */
  public renameSegment(name: string, nameControl: FormControl): void {
    nameControl.patchValue(name);
  }

  /**
   * Duplicates a given segment.
   * @param formGroup - The form group of the segment's values.
   */
  public duplicateSegment(formGroup: FormGroup): void {
    const newFormGroup = segmentFormGroupFactory();
    const val = { ...formGroup.value };
    val.name = this.itemService.getDupItemName(this.segments.value, val);
    newFormGroup.patchValue(formGroup.value);
    Object.keys(val.active_propulsion_sources).forEach(key => {
      const apsGroup = newFormGroup.get('active_propulsion_sources') as FormGroup;
      apsGroup.addControl(key, new FormControl(val.active_propulsion_sources[key]));
    });
    newFormGroup.get('active_propulsion_sources').patchValue(val.active_propulsion_sources);
    this.itemService.patchRowFormValues(val.gnc, newFormGroup.get('gnc'));
    this.segments.push(newFormGroup);
  }

  /**
   * Removes a segment from the list.
   * @param index - Index of the segment in the list.
   */
  public removeSegment(index: number): void {
    this.segments.removeAt(index);
  }

  /**
   * Sets the selected index to that of the clicked segment.
   * @param index - Index of the segment in the list.
   */
  public segmentSelected(index: number): void {
    this.selectedSegmentIndex = index;
  }
}
