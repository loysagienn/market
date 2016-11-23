import React, {Component} from 'react';


/**
 * Компонент, на который можно поставить фокус
 * Не используется браузерный фокус и tabindex
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
 * Фокус ставится при клике на элемент
 * Если нужно отменить фокусировку при клике, нужно в обработчике onClick написать event.nativeEvent.preventFocus = true
 *
 * Не работает псевдокласс :focus, если нужно, то в событиях onFocus и onBlur придется ставить отдельный класс
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

        if (event.nativeEvent.preventFocus) {
            return;
        }

        this.focus();

        event.nativeEvent.preventFocus = true;
    }

    focus() {
        focusToComponent(this);
    }

    blur() {
        if (!this._isFocused) {
            return;
        }

        focusToComponent(this.parentFocusable);
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

    get parentFocusable() {
        return this.context.parentFocusable || null;
    }

    get isFocused() {
        return this._isFocused;
    }

    setIsFocused(isFocused) {
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


// массив компонентов, которые в данный момент находятся в фокусе
let currentFocusComponentStack = [];

if (typeof window !== 'undefined') {
    window.addEventListener('click', event => event.preventFocus ? null : focusToComponent(null));
}

/**
 * Поставить фокус на компонент
 * @param focusComponent компонент, на который надо поставить фокус, если null - убрать фокус со всех элементов
 */
function focusToComponent(focusComponent = null) {

    const newFocusComponentStack = [];

    while(focusComponent) {
        newFocusComponentStack.unshift(focusComponent);
        focusComponent = focusComponent.parentFocusable;
    }

    let i = 0;

    while (newFocusComponentStack[i] === currentFocusComponentStack[i] && i < newFocusComponentStack.length) i++;

    currentFocusComponentStack.slice(i).reverse().forEach(component => component.setIsFocused(false));

    newFocusComponentStack.slice(i).forEach(component => component.setIsFocused(true));

    currentFocusComponentStack = newFocusComponentStack;
}

// props'ы, которые специально обрабатываются в компоненте, остальные в том же виде добавляются в div
const selfPropKeys = new Set(['onFocus', 'onBlur', 'onClick']);
