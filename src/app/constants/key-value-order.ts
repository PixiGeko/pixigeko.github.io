import {KeyValue} from '@angular/common';

// Preserve original property order
export function originalOrder(a: KeyValue<string, any>, b: KeyValue<string, any>): number {
  return 0;
}

// Order by ascending property value
export function valueAscOrder(a: KeyValue<string, any>, b: KeyValue<string, any>): number {
  return a.value.localeCompare(b.value);
}

// Order by descending property key
export function valueDescOrder(a: KeyValue<string, any>, b: KeyValue<string, any>): number {
  return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
}
