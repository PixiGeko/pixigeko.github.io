export interface EarthquakeDetails {
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  magnitude: number;
  magnitudeType: string;
  numberOfSeismicStations: number;
  gap: number;
  distanceFromNearestStation: number;
  rms: number;
  net: string;
  id: string;
  updated: string;
  place: string;
  type: string;
  locationSource: number;
  magSource: number;
  horizontalError: number;
  depthError: number;
  magError: string;
  magNst: string;
  status: string;
}
