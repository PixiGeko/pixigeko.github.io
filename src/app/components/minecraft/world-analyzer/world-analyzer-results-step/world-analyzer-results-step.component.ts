import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {WorldAnalyzerService} from "../../../../services/world-analyzer.service";
import {Chart} from 'chart.js/auto';
import {SettingsService} from '../../../../services/settings.service';
import {NbtChunk} from 'deepslate';

@Component({
  selector: 'app-world-analyzer-results-step[stepper]',
  templateUrl: './world-analyzer-results-step.component.html',
  styleUrls: ['./world-analyzer-results-step.component.scss']
})
export class WorldAnalyzerResultsStepComponent {
  @Input() stepper: MatStepper;

  @ViewChild('blocksPerHeightCanvas') blocksPerHeightCanvas: ElementRef<HTMLCanvasElement>;

  chart: any;

  constructor(public worldAnalyzerService: WorldAnalyzerService, public settings: SettingsService) {
    worldAnalyzerService.analyzeFinished.subscribe(() => this.initCharts());
  }

  private initCharts() {
    console.log(this.worldAnalyzerService.stats);
    
    let labels = Array.from(this.worldAnalyzerService.stats.blocksPerHeight.keys());

    let datasets = this.worldAnalyzerService.stats.palette.map((block, paletteIndex) => {
      const data: number[] = [];
      this.worldAnalyzerService.stats.blocksPerHeight.forEach((blocksAtHeight, height) => {
        data.push(blocksAtHeight.get(paletteIndex) ?? 0);
      });

      return {
        label: block,
        data: data
      };
    });

    const minHeightIndex = Math.min(...datasets.map(dataset => {
      return dataset.data.findIndex(v => v !== 0);
    }));

    const maxHeightIndex = Math.max(...datasets.map(dataset => {
      const temp = dataset.data;

      while (temp.length > 0 && temp[temp.length - 1] === 0) {
        temp.pop();
      }

      return temp.length - 1;
    }));

    if (minHeightIndex > maxHeightIndex) {
      labels = [];
      datasets = [];
    } else {
      labels = labels.slice(minHeightIndex, maxHeightIndex + 1);
      datasets = datasets.map(d => ({
        label: d.label,
        data: d.data.slice(minHeightIndex, maxHeightIndex + 1)
      }));
    }

    this.chart = new Chart(this.blocksPerHeightCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      }
    });
  }

  saveChart(canvas: HTMLCanvasElement, fileName: string) {
    window.location.href = canvas.toDataURL('image/png');
  }
}
