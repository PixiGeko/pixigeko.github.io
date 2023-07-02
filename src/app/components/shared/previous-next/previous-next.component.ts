import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-previous-next',
  templateUrl: './previous-next.component.html',
  styleUrls: ['./previous-next.component.scss']
})
export class PreviousNextComponent {
  @Input() previousDisabled = false;
  @Input() nextDisabled = false;

  @Input() previousLabel = 'common.previous';
  @Input() nextLabel = 'common.next';

  @Output() previousClicked = new EventEmitter<void>();
  @Output() nextClicked = new EventEmitter<void>();
}
