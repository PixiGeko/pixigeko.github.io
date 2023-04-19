import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-previous-next',
  templateUrl: './previous-next.component.html',
  styleUrls: ['./previous-next.component.scss']
})
export class PreviousNextComponent {
  @Input() previousDisabled: boolean = false;
  @Input() nextDisabled: boolean = false;

  @Input() previousLabel: string = 'common.previous';
  @Input() nextLabel: string = 'common.next';
  
  @Output() previousClicked = new EventEmitter<void>();
  @Output() nextClicked = new EventEmitter<void>();
}
