import {EventEmitter, Injectable} from '@angular/core';
import {WorldAnalyzerResultsForm, WorldAnalyzerSettingsForm} from "../models/minecraft/world-analyzer";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BlockState} from "deepslate";
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class WorldAnalyzerService {
  analyzeStarted = new EventEmitter<void>();
  analyzeFinished = new EventEmitter<void>();

  analyzing: boolean = false;
  analyzed: boolean = false;
  files: File[] = [];
  worldName?: string;
  dimensionFiles: { [key: string]: File[] } = {};
  settingsForm: FormGroup<WorldAnalyzerSettingsForm>;
  resultsForm: FormGroup<WorldAnalyzerResultsForm>;
  stats: {
    palette: string[];
    blocksPerHeight: Map<number, Map<number, number>> // <height, <indice, count>>
  };

  constructor(private fb: FormBuilder, private settings: SettingsService) {
  }

  reset() {
    this.analyzing = false;
    this.analyzed = false;
    this.files = [];
    this.worldName = undefined;
    this.stats = {
      palette: [],
      blocksPerHeight: new Map()
    };

    this.settingsForm = this.fb.group<WorldAnalyzerSettingsForm>({
      dimension: this.fb.control(null, Validators.required),
      blockFilters: this.fb.array<FormControl<string | null>>([]),
      minHeight: this.fb.control(null),
      maxHeight: this.fb.control(null),
      maxRegion: this.fb.control(null),
    });
    
    this.resultsForm = this.fb.group<WorldAnalyzerResultsForm>({
      backgroundColor: this.fb.control(this.settings.settings.world_analyzer.background_color),
      legendColor: this.fb.control(this.settings.settings.world_analyzer.legend_color)
    })

    this.addBlockFilter('^minecraft:.*diamond_ore$');

    this.settingsForm.markAllAsTouched();
  }

  removeBlockFilter(filter: FormControl) {
    const index = this.settingsForm.controls.blockFilters.controls.findIndex(f => f === filter);
    this.settingsForm.controls.blockFilters.removeAt(index);
  }

  addBlockFilter(value?: string) {
    const filter = this.fb.control(value ?? null, Validators.required);
    filter.markAllAsTouched();
    this.settingsForm.controls.blockFilters.push(filter);
  }

  get canAddBlockFilter() {
    return this.settingsForm.controls.blockFilters.length < 9;
  }

  get settingsStepCompleted() {
    return !!this.files?.length && !!this.worldName && this.settingsForm.valid;
  }

  get settingsStepEditable() {
    return false;
  }

  get analyzeStepCompleted() {
    return this.analyzed;
  }

  get analyzeStepEditable() {
    return false;
  }

  get resultsStepCompleted() {
    return this.analyzed;
  }

  get resultsStepEditable() {
    return false;
  }

  get regionFilesToAnalyze() {
    const dimension = this.settingsForm.controls.dimension.value;
    if (!dimension) return [];
    return this.dimensionFiles[dimension.name].sort((a, b) => a.webkitRelativePath.localeCompare(b.webkitRelativePath));
  }

  addBlock(block: BlockState, height: number) {
    if (!this.stats.blocksPerHeight.has(height)) this.stats.blocksPerHeight.set(height, new Map());

    const minHeight = this.settingsForm.controls.minHeight.value;
    const maxHeight = this.settingsForm.controls.minHeight.value;

    if (minHeight !== null && height < minHeight) return;
    if (maxHeight !== null && height > maxHeight) return;

    const blocksAtHeight = this.stats.blocksPerHeight.get(height);

    const fullBlockName = `${block.getName().namespace}:${block.getName().path}`;
    if ((this.settingsForm.controls.blockFilters.controls.map(f => f.value) as string[]).some(filter => fullBlockName.match(filter))) {
      const blockIndex = this.stats.palette.indexOf(fullBlockName);
      if (!this.stats.palette.includes(fullBlockName)) this.stats.palette.push(fullBlockName);
      if (!blocksAtHeight!.has(blockIndex)) blocksAtHeight!.set(blockIndex, 0);
      blocksAtHeight!.set(blockIndex, blocksAtHeight!.get(blockIndex)! + 1);
    }
  }
}
