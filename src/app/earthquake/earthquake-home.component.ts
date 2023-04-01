import {Component, OnInit} from '@angular/core';
import {EarthquakePeriod} from "./models/earthquake-period";
import {EarthquakeCategory} from "./models/earthquake-category";
import {EarthquakeSettings} from "./models/earthquake-settings";
import {USGSService} from "./services/u-s-g-s.service";
import {MapMarker} from "./models/map-marker";
import {EarthquakeDetails} from "./models/earthquake-details";


@Component({
  selector: 'app-earthquake-home',
  templateUrl: './earthquake-home.component.html',
  styleUrls: ['./earthquake-home.component.scss']
})
export class EarthquakeHomeComponent implements OnInit {
  periods: EarthquakePeriod[] = [
    {
      id: 'hour',
      translationKey: 'earthquake.periods.last_hour'
    },
    {
      id: 'day',
      translationKey: 'earthquake.periods.last_day'
    },
    {
      id: 'week',
      translationKey: 'earthquake.periods.last_week'
    },
    {
      id: 'month',
      translationKey: 'earthquake.periods.last_month'
    }
  ]
  categories: EarthquakeCategory[] = [
    {
      id: 'all',
      translationKey: 'earthquake.categories.all'
    },
    {
      id: 'significant',
      translationKey: 'earthquake.categories.significant'
    },
    {
      id: '1.0',
      translationKey: 'earthquake.categories.1_0'
    },
    {
      id: '2.5',
      translationKey: 'earthquake.categories.2_5'
    },
    {
      id: '4.5',
      translationKey: 'earthquake.categories.4_5'
    }
  ]

  settings: EarthquakeSettings;

  markers: MapMarker[] = [];

  selectedMarker?: MapMarker;
  selectedMarkerDetails?: Map<string, string | number>;

  constructor(private usgsService: USGSService) {
    this.settings = {
      period: this.periods[0],
      category: this.categories[0],
      isLoading: false
    };
  }

  ngOnInit() {
    this.loadEarthquakes();
  }

  loadEarthquakes() {
    this.settings.isLoading = true;
    this.markers = [];
    this.selectedMarker = undefined;
    this.usgsService.getEarthquakes(
      this.settings.category, this.settings.period
    ).subscribe({
      next: (csv) => {
        const lines = csv.split('\n');

        for (let i = 1; i < lines.length; i++) {
          const earthquakeDetails = lines[i].split(',');

          const details : EarthquakeDetails = {
            time: earthquakeDetails[0],
            latitude: Number(earthquakeDetails[1]),
            longitude: Number(earthquakeDetails[2]),
            depth: Number(earthquakeDetails[3]),
            magnitude: Number(earthquakeDetails[4]),
            magnitudeType: earthquakeDetails[5],
            numberOfSeismicStations: Number(earthquakeDetails[6]),
            gap: Number(earthquakeDetails[7]),
            distanceFromNearestStation: Number(earthquakeDetails[8]),
            rms: Number(earthquakeDetails[9]),
            net: earthquakeDetails[10],
            id: earthquakeDetails[11],
            updated: earthquakeDetails[12],
            place: earthquakeDetails[13],
            type: earthquakeDetails[14],
            locationSource: Number(earthquakeDetails[15]),
            magSource: Number(earthquakeDetails[16]),
            horizontalError: Number(earthquakeDetails[17]),
            depthError: Number(earthquakeDetails[18]),
            magError: earthquakeDetails[19],
            magNst: earthquakeDetails[20],
            status: earthquakeDetails[21]
          }

          this.markers.push({
            details: details,
            options: {
              radius: (Math.exp(details.magnitude / 1.01 - 0.13)) * 1000,
              center: {
                lat: details.latitude,
                lng: details.longitude
              },
              fillColor: 'yellow',
              strokeColor: 'greenyellow',
              strokeWeight: 1,
              clickable: true
            }
          })
        }

        this.settings.isLoading = false;
      },
      error: (e) => {
        this.settings.isLoading = false;
      }
    })
  }

  circleClicked(marker: MapMarker) {
    const details = new Map<string, string | number>();
    details.set('earthquake.details.time', marker.details.time);
    details.set('earthquake.details.place', marker.details.place);
    details.set('earthquake.details.latitude', marker.details.latitude);
    details.set('earthquake.details.longitude', marker.details.longitude);
    details.set('earthquake.details.depth', marker.details.depth);
    details.set('earthquake.details.magnitude', marker.details.magnitude);
    this.selectedMarkerDetails = details;

    this.selectedMarker = marker;
  }
}
