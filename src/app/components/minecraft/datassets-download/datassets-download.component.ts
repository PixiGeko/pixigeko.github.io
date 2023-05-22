import {Component, OnInit} from '@angular/core';
import {MGDService} from "../../../services/mgd.service";

@Component({
  selector: 'app-datassets-download',
  templateUrl: './datassets-download.component.html',
  styleUrls: ['./datassets-download.component.scss']
})
export class DatassetsDownloadComponent implements OnInit {
  constructor(private mgdService: MGDService) {

  }

  ngOnInit() {
    
  }
}
