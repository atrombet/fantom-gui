import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToggleButtonSubgroup } from '@interfaces';

@Component({
  selector: 'toggle-button-group',
  templateUrl: './toggle-button-group.component.html',
  styleUrls: [ './toggle-button-group.component.scss' ]
})
export class ToggleButtonGroupComponent implements OnInit {
  public selected: string;

  @Input() public subgroups: ToggleButtonSubgroup[];

  @Output() public selectionMade: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void {
    const firstId = this.subgroups[0]?.buttons[0]?.id || null;
    this.selected = firstId;
    this.selectionMade.emit(firstId);
  }

  public buttonSelected(id: string): void {
    this.selected = id;
    this.selectionMade.emit(id);
  }

}
