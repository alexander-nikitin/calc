let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

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

let budgetDay = money/30
console.log(budgetDay);