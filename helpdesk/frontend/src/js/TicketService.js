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
      callback: callback
    }

    createRequest(options);
  }

  get(id, callback) {
    const options = {
      url: '',
      method: 'GET',
      body: {method: 'ticketById', id: id},
      callback: callback
    }
    createRequest(options);
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
    const modal = document.querySelector('.modal');
    modal.remove();
  }

  update(id, data, callback) {
    const options = {
      data: data,
      body: {method: 'updateById', id: id},
      method: 'POST',
      url: '',
      callback: callback
    }
    createRequest(options);
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
  }

  delete(id, callback) {
    const options = {
      body: {method: 'deleteById', id: id},
      method: 'GET',
      url: '',
      callback: callback
    }
    createRequest(options);
  }
}
