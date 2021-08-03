let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;
let expences1;
let expences2;
let amount1;
let amount2;
let budgetDay;

money = 100000;
income = 'фриланс';
addExpenses = 'Подписки, Питомец, Подарки, Развлечения, Хотелки';
deposit = true;
mission = 1000000;
period = 12

addExpenses = addExpenses.toLowerCase();

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Такси, Кафе, Доставка еды');
console.log(addExpenses);

deposit = confirm('Есть ли у вас депозит в банке?');

expences1 = prompt('Введите обязательную статью расходов.', 'Статья расходов 1');
amount1 = +prompt('Во сколько это обойдется?');
expences2 = prompt('Введите обязательную статью расходов.', 'Статья расходов 2');
amount2 = +prompt('Во сколько это обойдется?');

function getExpensesMonth ( am1, am2) {
    return am1 + am2;
}

console.log(getExpensesMonth(amount1, amount2));

function getAccumulatedMonth (m, n) {
    return m - n;
}

console.log( getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)) );

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

function getTargetMonth (m, a) {
    return m / a;
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