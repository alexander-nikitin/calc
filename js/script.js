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

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expences = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.depositPercent = 0;
    this.depositMoney = 0;
}

AppData.prototype.start = function (n) {

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
};
AppData.prototype.reset = function () {
    for (let i = 0; i < allInputsText.length; i++) {
        allInputsText[i].removeAttribute('disabled', 'false');
        allInputsText[i].value = '';
        startBtn.style.display = 'block';
        resetBtn.style.display = 'none';
    }
};
AppData.prototype.showResult = function () {
    const _this = this;
    resultValueBudgetMonth.value = this.budgetMonth;
    resultValueBudgetDay.value = this.budgetDay;
    resultValueExpensesMonth.value = this.expensesMonth;
    resultValueAdditionalExpenses.value = this.addExpenses.join(', ');
    resultValueAdditionalIncome.value = this.addIncome.join(', ');
    resultValueTarget.value = Math.ceil(this.targetMonth());
    resultValuePeriod.value = this.calcPeriod();

    periodSelect.addEventListener('input', function () {
        resultValuePeriod.value = _this.calcPeriod();
    });

};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesAdd);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesAdd.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomeAdd.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function name() {
    const _this = this;

    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expences[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = +item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in _this.income) {
        _this.incomeMonth += +_this.income[key];
    }
};
AppData.prototype.getExpensesMonth = function () {
    const _this = this;

    for ( let key in _this.expences) {
        _this.expensesMonth += _this.expences[key];
    };
};
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpenses.value.split(',');
    const _this = this;

    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    })
};
AppData.prototype.getAddIncome = function () {
    const _this = this;

    additionalIncomeInputs.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getBudget = function () {
    this.budgetMonth =  this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.targetMonth = function () {
    let result = targetAmount.value / this.budgetMonth;

    if (result < 0) {
        return 'Цель не будет достигнута'
    } else {
        return Math.ceil(result);
    }
};
AppData.prototype.statusIncome = function (a) {
    if ( this.budgetDay >= 1200 ) {
        console.log('У вас высокий уровень дохода');
    } else if ( this.budgetDay >=600) {
        console.log('У вас средний уровень дохода');
    } else if ( this.budgetDay >= 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что-то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        this.depositPercent;
        do {
            this.depositPercent = +prompt('Какой годовой процент у вашего депозита?', 9);
        } while (!isNumber(cashIncome) || this.depositPercent == '');
        this.depositMoney = +prompt('Какая сумма у вас лежит на депозите?', 10000);
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventListeners = function () {
    const _this = this;


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

    expensesAdd.addEventListener('click', this.addExpensesBlock);

    incomeAdd.addEventListener('click', this.addIncomeBlock);

    function startBind() {
        _this.start();
    }

    startBtn.addEventListener('click', startBind);

    resetBtn.addEventListener('click', this.reset);
};

const appData = new AppData();

appData.eventListeners();

console.log(appData);



