import React, {Component} from 'react';
import {KEY_CODES} from '../../common/constants';
import {configClassName} from '../../common/helpers';



const focusGroups = {};

const usedPropsKeys = new Set(['focusGroup', 'onFocus', 'onBlur', 'onClick']);

export default class Focusable extends Component {
    constructor(props) {
        super(props);

        this._onClickHandler = event => this._onClick(event);
        this._onKeyDownHandler = event => this._onKeyDown(event);
        this._onWindowClick = event => this.blur();
    }

    componentDidMount() {
        window.addEventListener('click', this._onWindowClick);
        window.addEventListener('keydown', this._onKeyDownHandler);
    }

    componentWillUnmount() {

        window.removeEventListener('click', this._onWindowClick);
        window.removeEventListener('keydown', this._onKeyDownHandler);

        if (this.isFocused) {
            delete focusGroups[this.props.focusGroup];
        }

    }

    _onKeyDown(event) {

        const{onKeyDown} = this.props;

        if (onKeyDown) {
            onKeyDown(event);
            if (event.defaultPrevented) {
                return;
            }
        }

        const {keyCode} = event;

        if (keyCode === KEY_CODES.esc) {
            this.blur();
        }
    }

    _onClick(event) {

        event.stopPropagation();

        const {onClick} = this.props;

        if (onClick) {
            onClick(event);
        }

        if (event.defaultPrevented) {
            return;
        }

        this.focus();
    }

    focus() {
        if (this.isFocused) {
            return;
        }

        const {focusGroup, onFocus} = this.props;

        if (focusGroup in focusGroups) {
            focusGroups[focusGroup].blur(this);
        }

        focusGroups[focusGroup] = this;

        if (onFocus) {
            onFocus();
        }
    }

    blur(nextFocusNode = null) {
        if (!this.isFocused) {
            return;
        }

        const {focusGroup, onBlur} = this.props;

        delete focusGroups[focusGroup];

        if (onBlur) {
            onBlur({nextFocusNode});
        }
    }

    render() {

        const {props} = this;

        const otherProps = Object.keys(props).reduce(
            (otherProps, key) => usedPropsKeys.has(key)
                ? otherProps
                : Object.assign(otherProps, {[key]: props[key]}),
            {}
        );

        return <div
            onClick={this._onClickHandler}
            {...otherProps}
        />
    }

    get isFocused() {
        return focusGroups[this.props.focusGroup] === this;
    }

    static getFocusedNode(focusGroup) {
        return focusGroups[focusGroup] || null;
    }
}
