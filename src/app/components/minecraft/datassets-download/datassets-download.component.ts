import {Component, OnInit} from '@angular/core';
import {MGDService} from "../../../services/mgd.service";
import {MGDIndexVersion} from "../../../models/minecraft/mdg";
import {KeyValue} from "@angular/common";
import {MCMeta} from "../../../models/minecraft/mcmeta";

@Component({
  selector: 'app-datassets-download',
  templateUrl: './datassets-download.component.html',
  styleUrls: ['./datassets-download.component.scss']
})
export class DatassetsDownloadComponent implements OnInit {
  status: Status = {
    assets: {},
    data: {}
  }
  
  versions?: Record<string, MGDIndexVersion[]>;

  constructor(private mgdService: MGDService) {

  }

  ngOnInit() {
    this.mgdService.index().subscribe({
      next: (index) => {
        this.versions = this.groupBy(Object.values(index.versions).reverse(), v => v.version);
      }
    })
  }
  
  selectedVersionChanged() {
    if(!this.status.selectedVersion) return;
    this.status.data = {};
    this.status.assets = {};
    
    this.mgdService.loadAssetsMCMeta(this.status.selectedVersion).subscribe(mcmeta => this.status.assets.mcmeta = mcmeta);
    this.mgdService.loadDataMCMeta(this.status.selectedVersion).subscribe(mcmeta => this.status.data.mcmeta = mcmeta);
  }
  
  download(type: string) {
    if(!this.status.selectedVersion) return;
    window.open(`https://github.com/PixiGeko/Minecraft-default-${type}/archive/refs/heads/${this.mgdService.toVersionBranch(this.status.selectedVersion)}.zip`, '_blank')
  }

  groupBy<T, K extends keyof any>(arr: T[], key: (i: T) => K) {
    return arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    }, {} as Record<K, T[]>)
  }

  reverse(a: KeyValue<string, MGDIndexVersion[]>, b: KeyValue<string, MGDIndexVersion[]>): number {
    if(a.key === 'special') return 1;
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }
  
  get canDownloadAssets() {
    return this.status.selectedVersion && this.status.assets.mcmeta && !this.status.assets.isLoading;
  }

  get canDownloadData() {
    return this.status.selectedVersion && this.status.data.mcmeta && !this.status.data.isLoading;
  }
}

interface Status {
  selectedVersion?: MGDIndexVersion;
  assets: DownloadStatus;
  data: DownloadStatus;
}

interface DownloadStatus {
  isLoading?: boolean;
  mcmeta?: MCMeta;
}
