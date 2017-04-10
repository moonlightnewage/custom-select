import sayHello from './lib/sayHello.js';
import Select from './Select';

sayHello();

new Select({
    selector: '.js-select-blue',
    cssClass: 'select_blue'
});

new Select({
    selector: '.js-select-green',
    cssClass: 'select_green'
});

