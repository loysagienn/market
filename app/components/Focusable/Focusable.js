import React, {Component} from 'react';


let focusedStack = [];

let focusComponent = null;

const selfPropKeys = new Set(['onFocus', 'onBlur', 'onClick']);

/**
 * Компонент, на который можно поставить фокус, не использует браузерный фокус и tabindex
 * Почему просто не использовать браузерный фокус? С браузерным фокусом, если внутри одного
 * фокусируемого элемента находится другой фокусируемый элемент, то при переходе фокуса из
 * родительского к дочернему на родительском триггерится blur, а это не нужно во всех кейсах,
 * с которыми я сталкивался
 * В данном случае фокус работает так
 * Допустим, у нас есть следующая иерархия фокусируемых элементов, вложенных друг вдруга:
 *        A
 *        |
 *        B
 *      /   \
 *     C     D
 *          /  \
 *         E    F
 * Сначала в фокусе находится B
 * Дальше переносим фокус на F, в результате на элементах D и F сработает событие onFocus
 * Переносим фокус на E - на F сработает onBlur, на E - onFocus
 * Переносим фокус на C - на E и D сработает onBlur, на C - onFocus
 * Переносим фокус на B - на C сработает onBlur
 *
 * Фокус ставится при клике на элемент, причем в тот момент, когда событие всплывет до корневого
 * фокусируемого элемента. Если где-то по пути в событии onClick у объекта события вызвали preventDefault,
 * то фокус не поставится
 */
export default class Focusable extends Component {
    constructor(props) {
        super(props);

        this._isFocused = false;
        this._onClickHandler = event => this._onClick(event);
    }

    getChildContext() {
        return Object.assign({}, this.context, {parentFocusable: this});
    }

    _onClick(event) {

        const {onClick} = this.props;

        if (onClick) {
            onClick(event);
        }

        const {parentFocusable} = this.context;

        focusComponent = focusComponent || this;

        if (!parentFocusable) {
            if (!event.defaultPrevented) {
                focusComponent.focus();
            }
            focusComponent = null;
        }
    }

    get parentFocusable() {
        return this.context.parentFocusable || null;
    }

    /**
     * Ставит фокус на элемент
     */
    focus() {

        focusToNode(this);
    }

    /**
     * Если элемент находится в фокусе - ставит фокус на родительский фокусируемый элемент,
     * иначе ничего не делает
     */
    blur() {
        if (!this._isFocused) {
            return;
        }

        focusToNode(this.parentFocusable);
    }

    render() {

        const {props} = this;

        const passProps = Object.keys(props).reduce(
            (passProps, key) => selfPropKeys.has(key)
                ? passProps
                : Object.assign(passProps, {[key]: props[key]}),
            {}
        );

        return <div
            onClick={this._onClickHandler}
            {...passProps}
        />
    }

    /**
     * Находится ли элемент в фокусе
     */
    get isFocused() {
        return this._isFocused;
    }

    set isFocused(isFocused) {
        if (isFocused === this._isFocused) {
            return;
        }

        this._isFocused = isFocused;

        if (isFocused) {
            const {onFocus} = this.props;

            if (onFocus) {
                onFocus();
            }
        } else {
            const {onBlur} = this.props;

            if (onBlur) {
                onBlur();
            }
        }
    }
}

Focusable.childContextTypes = {
    parentFocusable: React.PropTypes.object
};

Focusable.contextTypes = {
    parentFocusable: React.PropTypes.object
};

function focusToNode(item) {
    const newFocusStack = [];

    while(item) {
        newFocusStack.unshift(item);
        item = item.parentFocusable;
    }

    let i = 0;

    while (newFocusStack[i] === focusedStack[i] && i < newFocusStack.length) {
        i++;
    }

    focusedStack.slice(i).reverse().forEach(item => item.isFocused = false);

    newFocusStack.slice(i).forEach(item => item.isFocused = true);

    focusedStack = newFocusStack;
}
