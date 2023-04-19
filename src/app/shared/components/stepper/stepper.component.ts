import {Component, Input, OnInit} from '@angular/core';
import {StepperStep} from "../../models/stepper";

@Component({
  selector: 'app-stepper[steps]',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() steps!: StepperStep[];
  @Input() currentStep!: StepperStep;

  ngOnInit() {
    if (!this.currentStep) this.currentStep = this.steps[0];
  }

  stepButtonClicked(step: StepperStep) {
    if (!this.isCurrentStep(step) && step.active()) this.currentStep = step;
  }

  nextStep() {
    if (
      this.currentStepIndex !== -1 &&
      this.currentStepIndex < this.steps.length - 2
    ) this.currentStep = this.steps[this.currentStepIndex + 1];
  }

  previousStep() {
    if (this.currentStepIndex > 0) this.currentStep = this.steps[this.currentStepIndex - 1];
  }

  get currentStepIndex() {
    const step = this.steps.find(s => s.id === this.currentStep.id);
    if(step) return this.steps.indexOf(step);
    return -1;
  }
  
  isCurrentStep(step: StepperStep) {
    return this.currentStep.id === step.id;
  }
}
