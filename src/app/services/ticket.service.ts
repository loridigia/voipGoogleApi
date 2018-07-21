import {Injectable} from '@angular/core';
import {Ticket} from '../app.types';

@Injectable()
export class TicketService {

  public list(): Ticket[] {

    return [{id: 20, event: 'event1'}, {id: 22, event: 'event2'}];

  }

}

