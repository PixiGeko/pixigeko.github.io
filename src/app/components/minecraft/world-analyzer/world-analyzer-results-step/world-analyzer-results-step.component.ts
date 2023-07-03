import {Component, Input} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {WorldAnalyzerService} from "../../../../services/world-analyzer.service";

@Component({
  selector: 'app-world-analyzer-results-step[stepper]',
  templateUrl: './world-analyzer-results-step.component.html',
  styleUrls: ['./world-analyzer-results-step.component.scss']
})
export class WorldAnalyzerResultsStepComponent {
  @Input() stepper: MatStepper;

  constructor(public worldAnalyzerService: WorldAnalyzerService) {
  }
}
