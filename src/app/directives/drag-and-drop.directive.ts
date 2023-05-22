import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @HostBinding('class.fileover') fileOver!: boolean;

  @Output() filesDropped = new EventEmitter<DataTransferItemList>();
  @Output() dragOver = new EventEmitter<any>();
  @Output() dragLeave = new EventEmitter<any>();

  @HostListener('dragover', ['$event'])
  onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver.emit();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragLeave.emit();
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const items = evt.dataTransfer.items?.length > 0;
    if (items) {
      this.filesDropped.emit(evt.dataTransfer.items);
    }
  }
}
