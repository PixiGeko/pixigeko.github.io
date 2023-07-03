import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chunk} from "../../../../../world-reader/src/models/chunk";
import {WorldChunk, WorldRegion} from "../../../../../world-reader/src/world";
import {WorldAnalyzerRegion} from "../../../../models/minecraft/world-analyzer";

@Component({
  selector: 'app-chunk-details[chunk][region]',
  templateUrl: './chunk-details.component.html',
  styleUrls: ['./chunk-details.component.scss']
})
export class ChunkDetailsComponent implements OnChanges {
  @Input() region: WorldAnalyzerRegion | null | undefined;
  @Input() chunk: WorldChunk | null | undefined;
  chunkData!: Chunk;
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['chunk']) {
      if(this.chunk) this.chunkData = this.chunk.asObject();
    }
  }
}
