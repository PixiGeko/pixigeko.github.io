import {Component, OnInit} from '@angular/core';
import {MGDService} from '../../../services/mgd.service';
import {MGDIndexVersion} from '../../../models/minecraft/mdg';
import {KeyValue} from '@angular/common';
import {MCMeta} from '../../../models/minecraft/mcmeta';
import {ActivatedRoute, Router} from '@angular/router';
import {ArrayUtils} from '../../../utils/ArrayUtils';

@Component({
  selector: 'app-datassets-download',
  templateUrl: './datassets-download.component.html',
  styleUrls: ['./datassets-download.component.scss']
})
export class DatassetsDownloadComponent implements OnInit {
  status: Status = {
    isLoading: true,
    assets: {},
    data: {}
  };

  versions?: Record<string, MGDIndexVersion[]>;

  constructor(private mgdService: MGDService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.status.isLoading = true;
    this.mgdService.index().subscribe({
      next: (index) => {
        const indexVersion = Object.values(index.versions).reverse();
        this.versions = ArrayUtils.groupBy(Object.values(indexVersion), v => v.version);

        this.activatedRoute.queryParamMap.subscribe(params => {
          if (params.has('version') && params.get('version') !== 'latest') {
            const versionFound = indexVersion.find(v => v.id === params.get('version'));

            if (versionFound) {
              this.status.selectedVersion = versionFound;
            } else {
              this.status.selectedVersion = indexVersion[0];
            }
          } else {
            this.status.selectedVersion = indexVersion[0];
          }

          this.selectedVersionChanged();
          this.status.isLoading = false;
        });
      }
    });
  }

  selectedVersionChanged() {
    if (!this.status.selectedVersion) return;

    this.status.data = {};
    this.status.assets = {};

    this.mgdService.loadAssetsMCMeta(this.status.selectedVersion).subscribe(mcmeta => this.status.assets.mcmeta = mcmeta);
    this.mgdService.loadDataMCMeta(this.status.selectedVersion).subscribe(mcmeta => this.status.data.mcmeta = mcmeta);

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          version: this.status.selectedVersion.id
        },
        queryParamsHandling: 'merge'
      }
    );
  }

  download(type: string) {
    if (!this.status.selectedVersion) return;
    window.open(`https://github.com/PixiGeko/Minecraft-default-${type}/archive/refs/heads/${this.mgdService.toVersionBranch(this.status.selectedVersion)}.zip`, '_blank');
  }

  reverse(a: KeyValue<string, MGDIndexVersion[]>, b: KeyValue<string, MGDIndexVersion[]>): number {
    if (a.key === 'special') return 1;
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
  isLoading: boolean;
  assets: DownloadStatus;
  data: DownloadStatus;
}

interface DownloadStatus {
  isLoading?: boolean;
  mcmeta?: MCMeta;
}
