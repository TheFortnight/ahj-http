import TicketService from "./TicketService";
import TicketForm from "./TicketForm";
import TicketView from './TicketView';

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
    this.container.innerHTML = '';
    const bodyContent = document.createElement('div');
    bodyContent.classList.add('container');
    const btn = document.createElement('button');
    btn.classList.add('new_task');
    btn.textContent = 'Create Task';
    bodyContent.appendChild(btn);
    this.container.appendChild(bodyContent);

    const callback = (response) => {   
      //let counter = 0;
      const table = document.createElement('ul');
      table.classList.add('table');
      const bodyContent = document.querySelector('.container');
      bodyContent.appendChild(table);
      response.forEach(ticket => {
        const ticketView = new TicketView(ticket);
        const ticketLine = ticketView.generateView();
        //ticketLine.setAttribute('ticket_id', ++counter);
        table.appendChild(ticketLine);
      });
      this.addListeners();
    }

    this.ticketService.list(callback);
  }
  
  addListeners = () => {
    console.log('ADDING LISTENERS');

// click on ticket
    const tickets = Array.from(document.querySelectorAll('.ticket'));
    tickets.forEach(ticket => {
      ticket.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('TARGET: '+e.target.classList);
        if(e.target.classList.contains('ticket_edit') || e.target.classList.contains('ticket_delete') || e.target.classList.contains('ticket_checkbox')) {
          console.log('other target!!!');
          return;
        }
        ticket.classList.toggle('detailed');
        const id = ticket.getAttribute('id');
        if(ticket.classList.contains('detailed')) {
          
          this.ticketService.get(id, (response) => {
            console.log('discription: '+response.description);
            
            const tickets = Array.from(document.querySelectorAll('.ticket'));
            const ticket = tickets.find(el => el.getAttribute('id') === id);
            const ticketDescr = ticket.querySelector('.ticket_description');
            ticketDescr.textContent = response.description;
          });
        }
        else {
          const tickets = Array.from(document.querySelectorAll('.ticket'));
          const ticket = tickets.find(el => el.getAttribute('id') === id);
          const ticketDescr = ticket.querySelector('.ticket_description');
          ticketDescr.textContent = '';
        }
      })
    })

// click create button
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
    });
// click delete
    const delBtns = Array.from(document.querySelectorAll('.ticket_delete'));
    delBtns.forEach((btn) => {
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const conf = confirm('Da li ste sigurne?');
        if (conf) {
          const ticket = btn.closest('li');
          const id = ticket.getAttribute('id');
          const callback = () => {
          this.init();
        }
        this.ticketService.delete(id, callback);
        }
        
      });
    }
      );
// click CheckBox
    const chBoxes = Array.from(document.querySelectorAll('ticket_checkbox'));
    chBoxes.forEach(box => {
      box.addEventListener()
    })
  }

  sendFormData = () => {
    console.log('SEND FORM STARTED')
    const form = document.querySelector('#create_form');
    const formData = new FormData(form);
  
    const callback = () => {
      this.init();
    }
    
    this.ticketService.create(formData, callback);

  }

  clearTable = () => {
    console.log('CLEAR TABLE')
    const table = document.querySelector('.table');
    table.innerHTML = '';
  }

}
