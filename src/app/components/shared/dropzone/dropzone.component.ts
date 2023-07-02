import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent {
  @Input() disabled = false;
  @Output() filesUploaded = new EventEmitter<File[]>;
  dropzoneOver = false;

  filesDropped(items: DataTransferItemList) {
    this.dropzoneOver = false;

    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const file = items[i]?.getAsFile();
      console.log(file);
      if (file) files.push(file);
    }

    this.uploadFiles(files);
  }

  filesSelected($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (!input.files) return;

    const files: File[] = [];
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files.item(i);
      if (file) files.push(file);
    }

    this.uploadFiles(files);
  }

  uploadFiles(files: File[]) {
    this.filesUploaded.emit(files);
  }
}
