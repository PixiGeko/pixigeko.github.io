import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-key-value[key][value]',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent {
  @Input() key!: string;
  @Input() value!: string;
  @Input() size: number = 16;
}
