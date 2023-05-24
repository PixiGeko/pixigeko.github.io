import {Injectable} from "@angular/core";
import {Event} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor() {
  }
  
  hasActiveEvent() {
    return this.getActivesEvents().length > 0;
  }
  
  getActivesEvents() : Event[] {
    const today = new Date();
    const events: Event[] = [];
    
    if(today.getMonth() === 5) {
      events.push(Event.PRIDE_MONTH);
    }
    
    return events;
  }
}
