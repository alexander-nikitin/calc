let booksWrapper = document.querySelector('.books');
let books = document.querySelectorAll('.book');
let body = document.querySelector('body');
let newBG = 'url(/image/you-dont-know-js.jpg)';
let book3Title = books[4].children[0].children[0];
let adv = document.querySelector('.adv');
let contentBook2 = books[0].children[1].children;
let contentBook5 = books[5].children[1].children;
let contentBook6 = books[2].children[1].children;
let newChapter = document.createElement('li');

newChapter.textContent = 'Глава 8: За пределами ES6';

booksWrapper.prepend(books[1]);
booksWrapper.append(books[2]);
books[3].insertAdjacentElement('beforebegin', books[4]);

body.style.backgroundImage = newBG;

book3Title.textContent = 'Книга 3. this и Прототипы Объектов';

body.removeChild(adv);

contentBook2[3].insertAdjacentElement('afterend', contentBook2[6]);
contentBook2[4].insertAdjacentElement('afterend', contentBook2[8]);
contentBook2[9].insertAdjacentElement('afterend', contentBook2[2]);

contentBook5[1].insertAdjacentElement('afterend', contentBook5[9]);
contentBook5[2].insertAdjacentElement('afterend', contentBook5[4]);
contentBook5[3].insertAdjacentElement('afterend', contentBook5[5]);
contentBook5[8].insertAdjacentElement('afterend', contentBook5[6]);

contentBook6[8].insertAdjacentElement('afterend', newChapter);