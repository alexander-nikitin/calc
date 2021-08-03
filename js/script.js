let str;

str = '       Какая-то очень длинная строка, которую нужно очень долго читать, такое ощущение будто она никогда не заканчивается     ';

function getString(a) {
    if (typeof(a) != 'string') {
        console.log('Аргумент не является строкой');
    } else {
        a = a.trim()

        if (a.length > 30) {
            console.log(a.substring(0, 30) + '...');
        } else {
            console.log(a);
        }

    }
}

getString(str);