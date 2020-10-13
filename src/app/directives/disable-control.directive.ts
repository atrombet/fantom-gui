import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective implements OnChanges {

  @Input() disableControl;

  constructor(private ngControl: NgControl) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.disableControl) {
      const action = this.disableControl ? 'disable' : 'enable';
      this.ngControl.control[action]();
    }
  }
}
