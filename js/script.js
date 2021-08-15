let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('cancel');
let incomeAdd = document.querySelector('.income_add');
let expensesAdd = document.querySelector('.expenses_add');
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeInputs = document.querySelectorAll('.additional_income-item');
let resultValueBudgetDay = document.getElementsByClassName('budget_day-value')[0];
let resultValueBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
let resultValueExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let resultValueAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
let resultValueAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
let resultValuePeriod = document.getElementsByClassName('income_period-value')[0];
let resultValueTarget = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let inconeAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpenses = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let allInputsText = document.querySelectorAll('input[type=text]')


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expences: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    depositPercent: 0,
    depositMoney: 0,
    start: function (n) {

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.statusIncome();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();

        for (let i = 0; i < allInputsText.length; i++) {
            allInputsText[i].setAttribute('disabled', 'true');
        }

        incomeAdd.setAttribute('disabled', 'true');
        expensesAdd.setAttribute('disabled', 'true');

        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    },
    reset: function () {
        for (let i = 0; i < allInputsText.length; i++) {
            allInputsText[i].removeAttribute('disabled', 'false');
            allInputsText[i].value = '';
            startBtn.style.display = 'block';
            resetBtn.style.display = 'none';
        }
    },
    showResult: function () {
        resultValueBudgetMonth.value = this.budgetMonth;
        resultValueBudgetDay.value = this.budgetDay;
        resultValueExpensesMonth.value = this.expensesMonth;
        resultValueAdditionalExpenses.value = this.addExpenses.join(', ');
        resultValueAdditionalIncome.value = this.addIncome.join(', ');
        resultValueTarget.value = Math.ceil(this.targetMonth());
        resultValuePeriod.value = this.calcPeriod();

        periodSelect.addEventListener('input', function () {
            resultValuePeriod.value = appData.calcPeriod();
        });

    },
    addExpensesBlock: function () {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesAdd);

        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);

        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function name() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expences[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getExpensesMonth: function () {
        for ( let key in appData.expences) {
            appData.expensesMonth += appData.expences[key];
        };
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpenses.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function () {
        additionalIncomeInputs.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getBudget: function () {
        appData.budgetMonth =  appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    targetMonth: function () {
        let result = targetAmount.value / appData.budgetMonth;

        if (result < 0) {
            return 'Цель не будет достигнута'
        } else {
            return Math.ceil(result);
        }
    },
    statusIncome: function (a) {
        if ( appData.budgetDay >= 1200 ) {
            console.log('У вас высокий уровень дохода');
        } else if ( appData.budgetDay >=600) {
            console.log('У вас средний уровень дохода');
        } else if ( appData.budgetDay >= 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что-то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.depositPercent;
            do {
                appData.depositPercent = +prompt('Какой годовой процент у вашего депозита?', 9);
            } while (!isNumber(cashIncome) || appData.depositPercent == '');
            appData.depositMoney = +prompt('Какая сумма у вас лежит на депозите?', 10000);
        }
    },
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    }
}

startBtn.setAttribute('disabled', 'true');

salaryAmount.addEventListener('input', function () {
    if(salaryAmount.value !== '') {
        startBtn.removeAttribute('disabled');
    } else {
        startBtn.setAttribute('disabled', 'true');
    }
});

periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
})

expensesAdd.addEventListener('click', appData.addExpensesBlock);

incomeAdd.addEventListener('click', appData.addIncomeBlock);

function startBind() {
    appData.start();
}

startBtn.addEventListener('click', startBind);

resetBtn.addEventListener('click', appData.reset);