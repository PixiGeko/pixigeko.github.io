import {Component} from '@angular/core';
import {EarthquakePeriod} from "./models/earthquake-period";
import {EarthquakeCategory} from "./models/earthquake-category";
import {EarthquakeSettings} from "./models/earthquake-settings";

@Component({
  selector: 'app-earthquake-home',
  templateUrl: './earthquake-home.component.html',
  styleUrls: ['./earthquake-home.component.scss']
})
export class EarthquakeHomeComponent {
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
      id: 'significant',
      translationKey: 'earthquake.categories.significant'
    },
    {
      id: '4.5',
      translationKey: 'earthquake.categories.4_5'
    },
    {
      id: '2.5',
      translationKey: 'earthquake.categories.2_5'
    },
    {
      id: '1.0',
      translationKey: 'earthquake.categories.1_0'
    },
    {
      id: 'all',
      translationKey: 'earthquake.categories.all'
    }
  ]

  settings: EarthquakeSettings;

  constructor() {
    this.settings = {
      period: this.periods[0],
      category: this.categories[0]
    };
  }
}
