import {Component, Input} from '@angular/core';
import {NbtChunk} from "deepslate";

@Component({
  selector: 'app-chunk-details[chunk]',
  templateUrl: './chunk-details.component.html',
  styleUrls: ['./chunk-details.component.scss']
})
export class ChunkDetailsComponent {
  @Input() chunk: NbtChunk;
}
