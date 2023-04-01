export interface EarthquakeSummary {
  features: EarthquakeSummaryItem[];
}

export interface EarthquakeSummaryItem {
  type: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    detail: string;
  }
}
