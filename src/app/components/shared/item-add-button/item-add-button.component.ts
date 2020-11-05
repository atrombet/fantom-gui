import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-add-button',
  templateUrl: './item-add-button.component.html',
  styleUrls: [ './item-add-button.component.scss' ]
})
export class ItemAddButtonComponent {
  @Input() public text: string;
}
