import {EarthquakeDetails} from "./earthquake-details";

export interface MapMarker {
  options: google.maps.CircleOptions;
  showDetails?: boolean;
  
  details: EarthquakeDetails
}
