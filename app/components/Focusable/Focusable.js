import React, {Component} from 'react';


const focusGroups = {};

const usedPropsKeys = new Set(['focusGroup', 'onFocus', 'onBlur', 'onClick']);

export class Focusable extends Component {
    constructor(props) {
        super(props);

        this._onClickHandler = event => this._onClick(event);
    }

    static getFocusedNode(focusGroup) {
        return focusGroups[focusGroup] || null;
    }

    _onClick(event) {
        const {onClick} = this.props;

        this.focus();

        if (onClick) {
            onClick(event);
        }
    }

    focus() {
        const {focusGroup, onFocus} = this.props;

        if (focusGroup in focusGroups) {
            focusGroups[focusGroup].blur(this);
        }

        focusGroups[focusGroup] = this;

        if (onFocus) {
            onFocus();
        }
    }

    blur(nextFocusNode) {
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
}
