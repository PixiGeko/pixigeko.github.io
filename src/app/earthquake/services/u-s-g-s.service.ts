import {Injectable} from '@angular/core';
import {EarthquakeCategory} from "../models/earthquake-category";
import {EarthquakePeriod} from "../models/earthquake-period";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class USGSService {
  constructor(private http: HttpClient) {
  }

  getEarthquakes(category: EarthquakeCategory, period: EarthquakePeriod) {
    return this.http.get(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${category.id}_${period.id}.csv`,
      {
        responseType: "text"
      }
    );
  }
}
