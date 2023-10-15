import TicketView from './TicketView';
import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    const options = {
      url: '',
      method: 'GET',
      body: {method: 'allTickets'},
      callback: (response) => {        
        const table = document.createElement('ul');
        table.classList.add('table');
        const bodyContent = document.querySelector('.container');
        bodyContent.appendChild(table);
        response.forEach(ticket => {
          const ticketView = new TicketView(ticket);
          const ticketLine = ticketView.generateView();
          table.appendChild(ticketLine);          
          
        })
      }
    }

    createRequest(options);
  }

  get(id, callback) {
  }

  create(data, callback) {
    const options = {
      data: data,
      body: {method: 'createTicket'},
      method: 'POST',
      url: '',
      callback: callback
    }
    createRequest(options);
  }

  update(id, data, callback) {}

  delete(id, callback) {}
}
