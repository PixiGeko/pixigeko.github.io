import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tag[tags]',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() tags: Tag[];
}

export interface Tag {
  text: string;
  color: string;
  tooltip?: string;
}

export const TAG_BETA: Tag = {
  text: 'common.tags.beta.name',
  tooltip: 'common.tags.beta.tooltip',
  color: 'rgba(250,105,42,0.5)',
}
