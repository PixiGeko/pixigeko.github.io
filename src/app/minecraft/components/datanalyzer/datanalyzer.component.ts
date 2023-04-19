import {Component, OnInit, ViewChild} from '@angular/core';
import {StepperComponent} from "../../../shared/components/stepper/stepper.component";
import {AnalyzeStats, CommandStats, FileAnalyze} from "../../models/datanalyzer";
import {MGDService} from "../../../shared/services/mgd.service";
import {Command, MGDIndexVersion} from "../../../shared/models/models/mdg";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileService} from "../../../shared/services/file.service";
import {MCFunctionAnalyzer} from "../../utils/MCFunctionAnalyzer";

@Component({
  selector: 'app-datanalyzer',
  templateUrl: './datanalyzer.component.html',
  styleUrls: ['./datanalyzer.component.scss']
})
export class DatanalyzerComponent implements OnInit {
  @ViewChild(StepperComponent) stepper!: StepperComponent;
  files!: File[];

  status: Status = {
    isAnalyzed: false,
    isAnalyzing: false
  }

  versions: MGDIndexVersion[] = [];

  analyzeForm!: FormGroup;


  constructor(private mgdService: MGDService, private fileService: FileService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.analyzeForm = this.fb.group({
      version: [null, Validators.required]
    });

    this.mgdService.index().subscribe({
      next: (index) => {
        this.versions = [];

        for (let vk of Object.keys(index.versions)) {
          this.versions.push(index.versions[vk]);
        }

        this.versions.reverse();

        this.analyzeForm.get('version')?.setValue(this.versions[0])
      },
      error: (e) => {
        // TODO
      }
    })
  }

  canGoToUpload(): boolean {
    return true;
    return !this.status.isAnalyzing;
  }

  canGoToAnalyzing(): boolean {
    return true;
    return !!this.files;
  }

  canGoToStats(): boolean {
    return true;
    return this.status.isAnalyzed;
  }

  filesUploaded(files: File[]) {
    this.files = files;
    this.stepper.nextStep();
  }

  canStartAnalyze() {
    return this.analyzeForm.valid && !this.status.isAnalyzing;
  }

  async startAnalyze() {
    this.status.isAnalyzing = true;
    this.status.isAnalyzed = false;

    const root = await this.mgdService.loadMGVersionJson<Command>(this.analyzeForm.get('version')?.value, 'reports/commands.json');
    const commands = Object.keys(root.children);

    const commandStats = new Map<string, CommandStats>();
    commandStats.set('_unknown', this.emptyCommandStats('_unknown'));
    for (let command of commands) {
      commandStats.set(command, this.emptyCommandStats(command));
    }
    
    const analyzeStats: AnalyzeStats = {
      commandStats: commandStats
    }

    for (const fileAnalyze of this.filesToAnalyze) {
      await MCFunctionAnalyzer.analyzeFile(fileAnalyze.file, analyzeStats);
    }

    this.status.isAnalyzed = true;
    this.status.isAnalyzing = false;
  }

  get filesToAnalyze() {
    if (!this.files) return [];
    return this.files.filter(f => f.name.endsWith('.mcfunction')).map(f => ({
      file: f,
      analyzed: false,
      analyzing: false
    } as FileAnalyze));
  }

  emptyCommandStats(commandName: string): CommandStats {
    return ({
      files: [],
      commandName: commandName
    })
  }
}

interface Status {
  isAnalyzed: boolean;
  isAnalyzing: boolean;
  error?: string;
}
