export default class Select {
    constructor(options) {
        this.selector = document.querySelectorAll(options.selector);
        this.cssClass = options.cssClass;
        this._init();
    }
    
    _init() {
        this._createDom();
        this._onClick();
    }
    
    _createDom() {
        this._createParent();
        this._createPlaceholder();
        this._createList();
    }
    
    
    _createParent() {
        for (let i = 0; i < this.selector.length; i++) {
            this.selector[i].style.display = 'none';
            
            let wrapper = document.createElement('div');
            wrapper.className = 'select js-select-wrapper';
            if (this.cssClass) {
                wrapper.classList.add(this.cssClass);
            }
            
            wrapper.innerHTML = this.selector[i].outerHTML;
            this.selector[i].parentNode.replaceChild(wrapper, this.selector[i]);
        }
        this.parent = document.querySelectorAll('.' + this.cssClass);
    }
    
    _createPlaceholder() {
       for (let i = 0; i < this.parent.length; i++) {
           let placeholder = document.createElement('span');
           placeholder.className = 'select__placeholder js-select-placeholder';
           placeholder.innerHTML = this.selector[i].children[0].innerHTML;
           
           console.log(this.selector[i].children[0].innerHTML);
           this.parent[i].appendChild(placeholder);
       }
    }
    
    _createList() {
        for (let i = 0; i < this.parent.length; i++) {
            let options = this.parent[i].querySelectorAll('option');
            let list = document.createElement('ul');
            list.className = 'select__list js-select-list';
            this.parent[i].appendChild(list);
            
            list.style.display = 'none';
            
            for (let j = 0; j < options.length; j++) {
                let li = document.createElement('li');
                li.className = 'js-select-list-item';
                li.innerHTML = options[j].innerHTML;
                list.appendChild(li);
            }
        }
    }
    
    _onClick() {
        document.addEventListener('click', this._hideAll.bind(this));
        for (let i = 0; i < this.parent.length; i++) {
            this.parent[i].addEventListener('click', this._clickOnTarget.bind(this));
        }
    }
    
    _clickOnTarget(e) {
        if (e.target.tagName == 'SPAN') {
            this._toggleList(e);
        }
        else if (e.target.tagName == 'LI') {
            this._insertValue(e);
            this._hideList(e);
        }
        else {
            return false;
        }
    }
    
    _toggleList(e) {
        let el = e.target.nextElementSibling;
        el.style.display = (el.style.display != 'block') ? 'block' : 'none';
    }
    
    _hideList(e) {
        let el = e.target.parentElement;
        el.style.display = 'none';
    }
    
    _hideAll(e) {
        if (e.target.classList.contains('js-select-placeholder') || e.target.classList.contains('js-select-list-item')) {
            return false;
        }
        else {
            let elems = document.querySelectorAll('.js-select-list');
            for (let i = 0; i < elems.length; i++) {
                elems[i].style.display = 'none';
            }
        }
    }
    
    _insertValue(e) {
        let el = e.target.parentElement;
        el.previousElementSibling.innerHTML = e.target.innerHTML;
    }
}