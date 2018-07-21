import {Component, ViewEncapsulation} from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../app.types';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tickets-list',
  template: `
    you have {{ getTickets().length }} tickets
  `
})
export class ListComponent {

  public constructor(private ticketService: TicketService) {
  }

  public getTickets(): Ticket[] {
    return this.ticketService.list();
  }

}
