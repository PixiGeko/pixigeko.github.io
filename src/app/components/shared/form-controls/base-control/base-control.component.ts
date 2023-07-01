import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-base-control',
  templateUrl: './base-control.component.html',
  styleUrls: ['./base-control.component.scss']
})
export class BaseControlComponent implements OnInit, OnChanges {
  @Input() control!: FormControl<any> | FormGroup;
  @Input() isDisabled: boolean = false;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() error!: string;
  @Input() hint!: string;
  @Input() required: boolean = false;
  
  @Output() valueChange = new EventEmitter<any>();
  
  requiredValidator = Validators.required;
  
  ngOnInit() {
    this.abstractControl.valueChanges.subscribe((value) => {
      this.valueChange.emit(value);
    });
    
    if(this.required) {
      this.formControl.addValidators(this.requiredValidator);
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.abstractControl) {
      if(changes['isDisabled']) {
        const isDisabled = changes['isDisabled'].currentValue as boolean;
        
        if(isDisabled) this.abstractControl.disable();
        else this.abstractControl.enable();
      }

      if(changes['required']) {
        const isDisabled = changes['required'].currentValue as boolean;

        if(!isDisabled) {
          if(!this.abstractControl.hasValidator(this.requiredValidator)) this.abstractControl.addValidators(this.requiredValidator);
        } else {
          this.abstractControl.removeValidators(this.requiredValidator);
        }
      }
      
      this.abstractControl.updateValueAndValidity();
    }
  }

  get abstractControl() {
    return this.control as AbstractControl;
  }
  
  get formControl() {
    return this.control as FormControl;
  }
}
