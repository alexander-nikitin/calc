const main = document.querySelector('main');

function DomElement(selector, height, width, bg, fontSize) {
    let _this = this;
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    if (selector[0] === '.') {
        main.innerHTML = "<div>Привет, это div</div>"
        selector = selector.slice(1)
        let div = document.querySelector('div');
        div.classList.add(selector);
        div.style.cssText=`height: ${height} !important;
            background-color: ${bg};
            width: ${width};
            font-size: ${fontSize};
        `;
    } else if (selector[0] === '#') {
        main.innerHTML = "<p>Привет, это абзаз</p>"
        selector = selector.slice(1);
        let p = document.querySelector('p');
        p.classList.add(selector);
        p.style.cssText=`height: ${height} !important;
            background-color: ${bg};
            width: ${width};
            font-size: ${fontSize};
        `;
    }
}

DomElement('#block', '300px', '100%', 'lime', '14px')