let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

let start = function (n) {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
}

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expences: {},
    addExpenses: [],
    deposit: false,
    depositPercent: 0,
    depositMoney: 0,
    mission: 1000000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        for (let i = 0; i < 2; i++) {
            let expencesKey;
            do {
                expencesKey = prompt('Введите обязательную статью расходов.', 'Статья расходов')
            } while (isNumber(expencesKey) || expencesKey == '');
            do {
                appData.expences[expencesKey] = +prompt('Во сколько это обойдется?');
            } while (!isNumber(appData.expences[expencesKey]) || appData.expences[expencesKey] == '');
        }
        for ( key in appData.expences) {
            appData.expensesMonth += appData.expences[key];
        };
    },
    asking: function () {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такси');
            } while (isNumber(itemIncome) || itemIncome == '');
            do {
                cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
            } while (!isNumber(cashIncome) || cashIncome == '');
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses;
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Такси, Кафе, Доставка еды');
        } while (isNumber(addExpenses) || addExpenses == '');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.getExpensesMonth();
        for (const key in appData.addExpenses) {
            appData.addExpenses[key] = appData.addExpenses[key][0].toUpperCase() + appData.addExpenses[key].slice(1);
        }
    },
    getBudget: function () {
        appData.budgetMonth =  appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    targetMonth: function () {
        let result = appData.mission / appData.budgetMonth;

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
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
}

appData.asking();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Цель будет достигнута через ' + appData.targetMonth() + ' месяцев');
appData.statusIncome();

for (key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' со значением ' + appData[key]);
}

console.log('addExpenses: ' + appData.addExpenses.join(', '));