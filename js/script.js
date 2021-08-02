let lang;
let week = [];
let namePerson;

lang = 'ru';

week = {
    'ru': ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    'en': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
}

if ( lang == 'ru' ) {
    console.log(week['ru']);
} else if ( lang == 'en' ) {
    console.log(week['en']);
}

console.log(week);

switch (lang) {
    case 'ru':
        console.log(week['ru']);
        break;
    case 'en':
        console.log(week['en']);
}

console.log(week);

console.log(week[lang]);

namePerson = 'Артем';

namePerson === 'Артем' ? console.log('Директор') :
    namePerson === 'Максим' ? console.log('Преподаватель') :
        console.log('Студент');
