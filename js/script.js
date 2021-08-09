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
    addExpences: [],
    deposit: false,
    mission: 1000000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        for (let i = 0; i < 2; i++) {
            let expencesKey = prompt('Введите обязательную статью расходов.', 'Статья расходов');
            appData.expences[expencesKey] = +prompt('Во сколько это обойдется?');
        }

        for ( key in appData.expences) {
            appData.expensesMonth += appData.expences[key];
        };
    },
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Такси, Кафе, Доставка еды');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.getExpensesMonth();
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