// 1) Два класса, First и Second, Second наследует от First .
// 2) В First есть метод hello - он печатает в консоль "Привет я метод родителя!".
// 3) Нужно написать в Second метод hello, чтоб он сначала вызывал метод hello из First, а потом сразу печатал в консоль "А я наследуемый метод!"
// 4) Проверить, чтобы все работало без ошибок в консоли
// 5) Запушить задание в репозиторий на github или реализовать на доске CodePen и прикрепить ссылку

class First {
    hello() {
        console.log('Привет я метод родителя!');
    }
}

class Second extends First{
    hello() {
        super.hello();
        console.log('А я наследуемый метод!');
    }
}

new Second().hello();