import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {WorldAnalyzerChunk} from '../../../../models/minecraft/world-analyzer';

@Component({
  selector: 'app-chunk-details[worldAnalyzerChunk]',
  templateUrl: './chunk-details.component.html',
  styleUrls: ['./chunk-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChunkDetailsComponent implements OnChanges {
  @Input() worldAnalyzerChunk: WorldAnalyzerChunk | null | undefined;
  
  constructor(private cdr: ChangeDetectorRef) {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['worldAnalyzerChunk']) {
      this.cdr.detectChanges();
    }
  }

  get chunk() {
    return this.worldAnalyzerChunk?.chunk;
  }
}
