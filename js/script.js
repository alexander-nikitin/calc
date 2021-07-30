let num = 266219;

num = String(num);
num = num.split('');

for (i=0; i < num.length; i++) {
    num[i] = +num[i];
}

let multi = 1;

for (i=0; i < num.length; i++) {
    multi = multi * num[i];
}

console.log('Произведение всех цифр числа: ' + multi);

multi = multi ** 3;

console.log(multi);

console.log('Вывод первых двух цифр числа: ' + multi.toString().substring(0, 2));
