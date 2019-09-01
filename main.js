// let db = [
//   {
//     id: '1',
//     name: 'Danilo',
//     deposit: '11000',
//     cCard: 'Visa'
//   },
//   {
//     id: '2',
//     name: 'Milica',
//     deposit: '33000',
//     cCard: 'Dina'
//   }
// ];

// localStorage.db = db;
// localStorage.db = JSON.stringify(db);
let db = [];
if (localStorage.db) {
  db = JSON.parse(localStorage.db);
}

window.addEventListener('beforeunload',function () {
  localStorage.db = JSON.stringify(db);
})
//SELECTORS

let mainTbody = document.querySelector('#mainTbody');
let accountsBtn = document.querySelector('#accountsBtn');
let addAccountBtn = document.querySelector('#addAccountBtn');
let editDeleteBtn = document.querySelector('#editDeleteBtn');
let mainRow = document.querySelector('#mainRow');
let formRow = document.querySelector('#formRow');
let addBtn = document.querySelector('#addBtn');
let addFormId = document.querySelector('#addFormId');
let addFormName = document.querySelector('#addFormName');
let addFormDeposit = document.querySelector('#addFormDeposit');
let addFormCard = document.querySelector('#addFormCard');
let editTableRow = document.querySelector('#editTableRow');
let editTbody = document.querySelector('#editTbody');
let editFormRow = document.querySelector('#editFormRow');
let editFormId = document.querySelector('#editFormId');
let editFormName = document.querySelector('#editFormName');
let editFormDeposit = document.querySelector('#editFormDeposit');
let editFormCard = document.querySelector('#editFormCard');
let editFormBtn = document.querySelector('#editFormBtn');

let index = '';
//EVENTS
addAccountBtn.addEventListener('click',showFormRow);
accountsBtn.addEventListener('click',showMainRow);
addBtn.addEventListener('click',addNewAccount);
editDeleteBtn.addEventListener('click',showEditTable);
editFormBtn.addEventListener('click',editAccount)

createTable();

function showFormRow() {
  mainRow.style.display = 'none';
  formRow.style.display = 'block';
  editTableRow.style.display = 'none';
  editFormRow.style.display = 'none';
  showWithdrawRow.style.display = 'none';
  withdrawInputRow.style.display = 'none';

}
function showMainRow() {
  mainRow.style.display = 'block';
  formRow.style.display = 'none';
  editTableRow.style.display = 'none';
  editFormRow.style.display = 'none';
  showWithdrawRow.style.display = 'none';
  withdrawInputRow.style.display = 'none';

}

function editAccount() {
  let id = editFormId.value;
  let name = editFormName.value;
  let deposit = editFormDeposit.value;
  let cCard = editFormCard.value;

  let editedObj = {
    id : id,
    name: name,
    deposit: deposit,
    cCard: cCard
  }
  db[index] = editedObj;
  createTable();
  showMainRow();
}


//ADD NEW ACCOUNT
function addNewAccount() {
  db.push({
    id: addFormId.value,
    name: addFormName.value,
    deposit: addFormDeposit.value,
    cCard: addFormCard.value
  });
  addFormId.value = '';
  addFormName.value = '';
  addFormDeposit.value = '';
  addFormCard.value = '';
  createTable();
  showMainRow();
}
//SHOW EDIT TABLE
function showEditTable() {
  mainRow.style.display = 'none';
  formRow.style.display = 'none';
  createEditTable();
  editTableRow.style.display = 'block';
  editFormRow.style.display = 'none';
  showWithdrawRow.style.display = 'none';
  withdrawInputRow.style.display = 'none';

}


//EDIT TABLE
function createEditTable() {
  let text = '';
  for (var i = 0; i < db.length; i++) {
    text += '<tr><td>'+db[i].id+'</td><td>'+db[i].name+'</td><td>'+db[i].deposit+'</td><td>'+db[i].cCard+'</td><td><button data-index="'+i+'" class="edit btn btn-warning btn-sm">Edit</button></td><td><button data-index="'+i+'" class="btn btn-danger btn-sm delete">Delete</button></td></tr>';
  }
  editTbody.innerHTML = text;
  let deleteBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click',deleteAccount);
    editBtns[i].addEventListener('click',showEditForm);
  }
}
//SHOW EDIT FORM
function showEditForm() {
  mainRow.style.display = 'none';
  formRow.style.display = 'none';
  editTableRow.style.display = 'none';
  editFormRow.style.display = 'block';
  showWithdrawRow.style.display = 'none';
  withdrawInputRow.style.display = 'none';


  index = this.getAttribute('data-index');
  editFormId.value = db[index].id;
  editFormName.value = db[index].name;
  editFormDeposit.value = db[index].deposit;
  editFormCard.value = db[index].cCard;
}

//CREATE TABLE
function createTable() {
  let text = '';
  for (var i = 0; i < db.length; i++) {
    text += '<tr><td>'+db[i].id+'</td><td>'+db[i].name+'</td><td>'+db[i].deposit+'</td><td>'+db[i].cCard+'</td></tr>';
  }
  mainTbody.innerHTML = text;
}

//DELETE ACCOUNT
function deleteAccount() {
  let id = this.getAttribute('data-index');
  db.splice(id,1);
  createTable();
  showMainRow();
}
