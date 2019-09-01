//DODATAK ZA WITHDRAW
let withdrawBtn = document.querySelector('#withdrawBtn');
let withdrawFormDeposit = document.querySelector('#withdrawFormDeposit');
let withdrawFormInput = document.querySelector('#withdrawFormInput');
let withdrawFormBtn = document.querySelector('#withdrawFormBtn');

withdrawBtn.addEventListener('click',withdrawRow);
withdrawFormBtn.addEventListener('click',withdrawMoney);

function withdrawRow() {
  mainRow.style.display = 'none';
  formRow.style.display = 'none';
  editTableRow.style.display = 'none';
  editFormRow.style.display = 'none';
  showWithdrawRow.style.display = 'block';
  withdrawInputRow.style.display = 'none';
  createWithdraw();
}

function createWithdraw() {
  let text = '';
  for (var i = 0; i < db.length; i++) {
    text += '<tr><td>'+db[i].id+'</td><td>'+db[i].name+'</td><td>'+db[i].deposit+'</td><td>'+db[i].cCard+'</td><td><button data-index="'+i+'" class="btn btn-danger btn-sm withdraw">Withdraw</button></td></tr>';
  }
  withdrawTbody.innerHTML = text;
  let wthBtn = document.querySelectorAll('.withdraw');
  for (var i = 0; i < wthBtn.length; i++) {
    wthBtn[i].addEventListener('click',showWithdrawInput);
  }
}

function showWithdrawInput() {
  mainRow.style.display = 'none';
  formRow.style.display = 'none';
  editTableRow.style.display = 'none';
  editFormRow.style.display = 'none';
  showWithdrawRow.style.display = 'none';
  withdrawInputRow.style.display = 'block';

  index = this.getAttribute('data-index');
  withdrawFormDeposit.value = db[index].deposit;
}

function withdrawMoney() {
  let iznos = withdrawFormInput.value;
  let newDeposit = withdrawFormDeposit.value - iznos;
  withdrawFormInput.value = '';

  let withdrawObj = {
    id : db[index].id,
    name: db[index].name,
    deposit: newDeposit,
    cCard: db[index].cCard
  }
  db[index] = withdrawObj;
  createTable();
  showMainRow();
}
