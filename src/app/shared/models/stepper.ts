import {TemplateRef} from "@angular/core";

export interface StepperStep {
  titleTK: string;
  id: string;
  active: () => boolean;
  template: TemplateRef<any>;
}
