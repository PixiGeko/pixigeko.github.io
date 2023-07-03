import {Component, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {WorldAnalyzerService} from "../../../services/world-analyzer.service";

@Component({
  selector: 'app-world-analyzer',
  templateUrl: './world-analyzer.component.html',
  styleUrls: ['./world-analyzer.component.scss']
})
export class WorldAnalyzerComponent {
  @ViewChild('stepper') private stepper: MatStepper;
  
  constructor(public worldAnalyzerService: WorldAnalyzerService) {
  }
}
