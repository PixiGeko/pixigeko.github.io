import {EarthquakePeriod} from "./earthquake-period";
import {EarthquakeCategory} from "./earthquake-category";

export interface EarthquakeSettings {
  period: EarthquakePeriod;
  category: EarthquakeCategory;
}
