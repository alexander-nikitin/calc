let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;
let expences1;
let expences2;
let expences3;
let expences4;
let amount1;
let amount2;
let amount3;
let amount4;

money = 100000;
income = 'фриланс';
addExpenses = 'Подписки, Питомец, Подарки, Развлечения, Хотелки';
deposit = true;
mission = 1000000;
period = 12

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let budgetDay = 100000/30
console.log(budgetDay);

money = prompt('Ваш месячный доход?');
console.log('money: ' + money);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log('addExpenses: ' + addExpenses);

deposit = confirm('Есть ли у вас депозит в банке?');
console.log('deposit: ' + deposit);

expences1 = prompt('Введите обязательную статью расходов.');
amount1 = prompt('Во сколько это обойдется?');
expences2 = prompt('Введите обязательную статью расходов.');
amount2 = prompt('Во сколько это обойдется?');
expences3 = prompt('Введите обязательную статью расходов.');
amount3 = prompt('Во сколько это обойдется?');
expences4 = prompt('Введите обязательную статью расходов.');
amount4 = prompt('Во сколько это обойдется?');

let budgetMonth = +money - (+amount1 + +amount2 + +amount3 + +amount4);
console.log('Месячный бюджет равен: ' + budgetMonth);

let missionTime = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута через ' + missionTime + ' месяцев.');

budgetDay = budgetMonth / 30;

if ( budgetDay >= 1200 ) {
    console.log('У вас высокий уровень дохода');
} else if ( budgetDay >=600) {
    console.log('У вас средний уровень дохода');
} else if ( budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что-то пошло не так');
}