let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    const newRow = expenseTableBody.insertRow();
    createTableCells(newRow, expense);
    updateCharts(); // Update the charts with the new data
});

function createTableCells(row, expense) {
    const categoryCell = row.insertCell();
    const amountCell = row.insertCell();
    const dateCell = row.insertCell();
    const deleteCell = row.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.addEventListener('click', function() {
        const index = expenses.indexOf(expense);
        expenses.splice(index, 1);
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount.toFixed(2);
        expenseTableBody.removeChild(row);
        updateCharts(); // Update the charts after deletion
    });
    deleteCell.appendChild(deleteBtn);
}

// Initialize the table with any pre-existing expenses
function initializeTable() {
    expenses.forEach(expense => {
        totalAmount += expense.amount;
        totalAmountCell.textContent = totalAmount.toFixed(2);

        const newRow = expenseTableBody.insertRow();
        createTableCells(newRow, expense);
    });
    updateCharts(); // Update the charts initially
}

initializeTable();

// Update Charts Function
function updateCharts() {
    const categoryAmounts = {};
    expenses.forEach(expense => {
        if (!categoryAmounts[expense.category]) {
            categoryAmounts[expense.category] = 0;
        }
        categoryAmounts[expense.category] += expense.amount;
    });

    // Generate Category Breakdown Chart
    const categoryLabels = Object.keys(categoryAmounts);
    const categoryData = Object.values(categoryAmounts);
    const categoryChartCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryChartCtx, {
        type: 'pie',
        data: {
            labels: categoryLabels,
            datasets: [{
                data: categoryData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }]
        }
    });

    // Generate Monthly Comparison Chart (Example: Not fully implemented)
    // You can implement the logic for month-to-month comparison as needed
}
