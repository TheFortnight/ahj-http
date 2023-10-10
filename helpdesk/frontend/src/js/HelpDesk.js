import TicketService from "./TicketService";
import TicketForm from "./TicketForm";
import TicketView from "./TicketView";

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
    console.log('create button: '+createBtn);
    createBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const ticketForm = new TicketForm();
      ticketForm.openCreateForm();
      const cancelBtn = document.querySelector('.cancel');
      cancelBtn.addEventListener('click', (e) =>{
        const modal = document.querySelector('.modal');
        e.preventDefault();
        modal.remove();

      })
    })
  }

}
