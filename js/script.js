let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;
let expences = [];
let budgetDay;

income = 'фриланс';
addExpenses = 'Подписки, Питомец, Подарки, Развлечения, Хотелки';
deposit = true;
mission = 1000000;
period = 12

let start = function (n) {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
}

addExpenses = addExpenses.toLowerCase();

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Такси, Кафе, Доставка еды');
console.log(addExpenses);

deposit = confirm('Есть ли у вас депозит в банке?');

let getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expences[i] = prompt('Введите обязательную статью расходов.', 'Статья расходов');

        sum += +prompt('Во сколько это обойдется?')
    }

    return sum;
}

let expencesAmount = getExpensesMonth();

function getAccumulatedMonth (m, n) {
    return m - n;
}

console.log( getAccumulatedMonth(money, expencesAmount) );

let accumulatedMonth = getAccumulatedMonth(money, expencesAmount);

function getTargetMonth (m, a) {
    let result = m / a;

    if (result < 0) {
        return 'Цель не будет достигнута'
    } else {
        return result;
    }
}

console.log(getTargetMonth(mission, accumulatedMonth));

budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день = ' + budgetDay);

let getStatusIncome = function (a) {
    if ( budgetDay >= 1200 ) {
        console.log('У вас высокий уровень дохода');
    } else if ( budgetDay >=600) {
        console.log('У вас средний уровень дохода');
    } else if ( budgetDay < 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что-то пошло не так');
    }
}

getStatusIncome();

let showTypeOf = function (data) {
    console.log(typeof(data));
}

showTypeOf(money);