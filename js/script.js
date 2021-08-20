'use strict'

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('cancel');
const incomeAdd = document.querySelector('.income_add');
const expensesAdd = document.querySelector('.expenses_add');
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeInputs = document.querySelectorAll('.additional_income-item');
const resultValueBudgetDay = document.getElementsByClassName('budget_day-value')[0];
const resultValueBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
const resultValueExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
const resultValueAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
const resultValueAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
const resultValuePeriod = document.getElementsByClassName('income_period-value')[0];
const resultValueTarget = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const inconeAmount = document.querySelector('.income-amount');
const incomeItems = document.querySelectorAll('.income-items');
const expensesTitle = document.querySelector('.expenses-title');
const expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpenses = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const allInputsText = document.querySelectorAll('input[type=text]')

class AppData {
    constructor() {
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

    start(){
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
    }

    reset() {
        for (let i = 0; i < allInputsText.length; i++) {
            allInputsText[i].removeAttribute('disabled');
            allInputsText[i].value = '';
            startBtn.style.display = 'block';
            resetBtn.style.display = 'none';
        }
    }

    showResult() {
        const _this = this;
        resultValueBudgetMonth.value = this.budgetMonth;
        resultValueBudgetDay.value = this.budgetDay;
        resultValueExpensesMonth.value = this.expensesMonth;
        resultValueAdditionalExpenses.value = this.addExpenses.join(', ');
        resultValueAdditionalIncome.value = this.addIncome.join(', ');
        resultValueTarget.value = Math.ceil(this.targetMonth());
        resultValuePeriod.value = this.calcPeriod();

        periodSelect.addEventListener('input', () => {
            resultValuePeriod.value = this.calcPeriod();
        });
    }

    addExpensesBlock() {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesAdd);

        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    }

    addIncomeBlock() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);

        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expences[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getExpensesMonth() {
        for ( let key in this.expences) {
            this.expensesMonth += this.expences[key];
        }
    }

    getAddExpenses() {
        let addExpenses = additionalExpenses.value.split(',');

        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    }

    getAddIncome() {
        additionalIncomeInputs.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getBudget() {
        this.budgetMonth =  this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    targetMonth() {
        let result = targetAmount.value / this.budgetMonth;

        if (result < 0) {
            return 'Цель не будет достигнута'
        } else {
            return Math.ceil(result);
        }
    }

    statusIncome(a) {
        if ( this.budgetDay >= 1200 ) {
            console.log('У вас высокий уровень дохода');
        } else if ( this.budgetDay >=600) {
            console.log('У вас средний уровень дохода');
        } else if ( this.budgetDay >= 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что-то пошло не так');
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.depositPercent;
            do {
                this.depositPercent = +prompt('Какой годовой процент у вашего депозита?', 9);
            } while (!isNumber(cashIncome) || this.depositPercent == '');
            this.depositMoney = +prompt('Какая сумма у вас лежит на депозите?', 10000);
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    eventListeners() {
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
    }
}

const appData = new AppData();

appData.eventListeners();

console.log(appData);



