import React, {Component} from 'react';


let focusedStack = [];

let focusComponent = null;

const selfPropKeys = new Set(['onFocus', 'onBlur', 'onClick']);


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

        if (event.defaultPrevented) {
            return;
        }

        const {parentFocusable} = this.context;

        focusComponent = focusComponent || this;

        if (!parentFocusable) {
            focusComponent.focus();
            focusComponent = null;
        }
    }

    get parentFocusable() {
        return this.context.parentFocusable || null;
    }

    focus() {

        focusToNode(this);
    }

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
