import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'prop-source',
  templateUrl: './prop-source.component.html',
  styles: [
  ]
})
export class PropSourceComponent {
  @Input() public propSource: FormGroup;

  constructor() {}
}
