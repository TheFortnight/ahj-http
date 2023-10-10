import TicketForm from "./TicketForm";

TicketForm
/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(ticket) {
    this.ticket = ticket;
    
  }

  generateView(){
    const ticketLine = document.createElement('li');
    ticketLine.classList.add('ticket');
    ticketLine.setAttribute('id', `${this.ticket.id}`);
    ticketLine.setAttribute('name', `${this.ticket.name}`)
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('ticket_checkbox');
    const ticketDate = document.createElement('p');
    ticketDate.classList.add('ticket_date');
    ticketDate.textContent = this.ticket.created;
    const ticketDescr = document.createElement('p');
    ticketDescr.classList.add('ticket_name');
    ticketDescr.textContent = this.ticket.name;
    const editBtn = document.createElement('button');
    editBtn.classList.add('ticket_edit');
    const delBtn = document.createElement('button');
    editBtn.classList.add('ticket_delete');

    ticketLine.appendChild(checkBox);
    ticketLine.appendChild(ticketDescr);
    ticketLine.appendChild(ticketDate);
    ticketLine.appendChild(editBtn);
    ticketLine.appendChild(delBtn);

    return ticketLine;
  }


  openCreateForm = () => {
    console.log('opening create form');
    const createForm = new TicketForm();
    this.container.appendChild(createForm);
  }

}
