/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    
  }

  openCreateForm () {
    this.modalCreate = document.createElement('div');
    this.modalCreate.innerHTML = `<div class="modal modal_create">
    <div class="header">
    <p>Create New Ticket</p>
    </div>
    <div class="body">
      <form id="create_form" class="form">
        <div class="form_group">
          <input type="text" name="name" placeholder="short description" class="form_control">
        </div>
        <div class="form_group">
          <input type="text" name="description" placeholder="detailaed description" class="form_control">
        </div>
      </form>
    </div>
    <div class="footer">
    <button class="cancel">Cancel</button>
    <button class="create">Create Task</button>
    </div>
  </div>`
  const body = document.querySelector('body');
  body.appendChild(this.modalCreate);
  }

}
