import {Component, Input, OnInit} from '@angular/core';
import {DIMENSIONS} from "../../../../models/minecraft/world-analyzer";
import {WorldAnalyzerService} from "../../../../services/world-analyzer.service";
import {MatStepper} from "@angular/material/stepper";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-world-analyzer-settings-step[stepper]',
  templateUrl: './world-analyzer-settings-step.component.html',
  styleUrls: ['./world-analyzer-settings-step.component.scss']
})
export class WorldAnalyzerSettingsStepComponent implements OnInit {
  @Input() stepper: MatStepper;

  dimensions = DIMENSIONS;

  constructor(
    public worldAnalyzerService: WorldAnalyzerService,
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.worldAnalyzerService.reset();
  }

  filesSelected($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (!input.files || !input.files.length) {
      this.snackBar.open(
        this.translateService.instant('minecraft.world_analyzer.steps.settings.uploaded_folder_empty'),
        undefined,
        {
          duration: 5000,
          horizontalPosition: "right"
        }
      )
      return;
    }

    const files: File[] = [];
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files.item(i);
      if (file) files.push(file);
    }

    this.worldAnalyzerService.files = files;
    this.worldAnalyzerService.worldName = this.worldAnalyzerService.files[0].webkitRelativePath.split('/')[0];

    this.worldAnalyzerService.dimensionFiles = {};
    for (let dimension of this.dimensions) {
      this.worldAnalyzerService.dimensionFiles[dimension.name] = this.worldAnalyzerService.files.filter(f => f.webkitRelativePath.match(`${this.worldAnalyzerService.worldName}/${dimension.path}/.*\.mca`))
    }
  }
}
