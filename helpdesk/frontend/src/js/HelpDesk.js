import TicketService from "./TicketService";
import TicketForm from "./TicketForm";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = new TicketService();
  }

  init = () => {
    const bodyContent = document.createElement('div');
    bodyContent.classList.add('container');    
    const btn = document.createElement('button');
    btn.classList.add('new_task');
    btn.textContent = 'Create Task';
    bodyContent.appendChild(btn);
    this.container.appendChild(bodyContent);    
    this.ticketService.list();
    this.addListeners();
  }
  
  addListeners = () => {
    const createBtn = document.querySelector('.new_task');
    createBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const ticketForm = new TicketForm();
      ticketForm.openCreateForm();
      const cancelBtn = document.querySelector('.cancel');
      cancelBtn.addEventListener('click', (e) =>{
        const modal = document.querySelector('.modal');
        e.preventDefault();
        modal.remove();
      });
      const sendBtn = document.querySelector('.modal .create');
      sendBtn.addEventListener('click', (e) => {
        console.log('CREATE CLICKED');
        e.preventDefault();
        this.sendFormData();
      })
    })
  }

  sendFormData = () => {
    console.log('SEND FORM STARTED')
    const form = document.querySelector('#create_form');
    const formData = new FormData(form);
    const callback = (response) => {
      if(response.status) {
      console.log('CREATE RESPONSE: '+response);
      }
      
    }
    
    this.ticketService.create(formData, callback);

  }

}
