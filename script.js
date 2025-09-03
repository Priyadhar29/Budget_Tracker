let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;
let history = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];

document.getElementById('balance').innerText = balance;
renderHistory();

function addIncome() {
  const amount = parseInt(document.getElementById('incomeAmount').value);
  const desc = document.getElementById('incomeDesc').value || 'Income';

  if (amount > 0) {
    balance += amount;
    addHistory(`+ ₹${amount} - ${desc}`);
    updateUI();
  } else {
    alert('Enter a valid amount!');
  }
  document.getElementById('incomeAmount').value = '';
  document.getElementById('incomeDesc').value = '';
}

function addExpense() {
  const amount = parseInt(document.getElementById('expenseAmount').value);
  const desc = document.getElementById('expenseDesc').value || 'Expense';

  if (amount > 0 && amount <= balance) {
    balance -= amount;
    addHistory(`- ₹${amount} - ${desc}`);
    updateUI();
  } else {
    alert('Enter a valid amount or check balance!');
  }
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseDesc').value = '';
}

function addHistory(entry) {
  const timestamp = new Date().toLocaleString();
  history.unshift(`${timestamp}: ${entry}`);
  if (history.length > 10) history.pop(); // Keep last 10
}

function updateUI() {
  document.getElementById('balance').innerText = balance;
  localStorage.setItem('balance', balance);
  localStorage.setItem('history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}
