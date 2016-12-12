import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Focusable} from '../';


const types = {
    number: 'number'
};

const NUMBER_REGEXP = /[^0-9.]|\.(?=.*\.)/g;

export default class Input extends Component {
    constructor(props) {
        super(props);

        this._onInputHandler = event => this._onInput(event);
        this._onBlurHandler = event => this._onBlur(event);
        this._needForeceUpdate = false;

        this._value = null;
    }
    get value() {
        return this._value === null ? this.props.value : this._value;
    }
    _onInput(event) {

        let value;

        if (this.props.type === types.number) {
            value = event.target.value.replace(NUMBER_REGEXP, '');
        } else {
            value = event.target.value;
        }

        if (value === this._value) {
            return;
        }

        if (value === this.props.value) {
            this._value = null;
        } else {
            this._value = value;
        }

        const {onInput} = this.props;

        this._needForeceUpdate = true;

        if (onInput) {
            onInput(value);
        }

        if (this._needForeceUpdate) {
            this.forceUpdate();
        }

    }

    _onBlur(event) {
        let value = this._value;

        if (value === null) {
            return;
        }

        if (this.props.type === types.number) {

            value = parseFloat(value);

            const {minValue = null, maxValue = null} = this.props;

            if (minValue !== null && value < minValue) {
                value = minValue;
            }

            if (maxValue !== null && value > maxValue) {
                value = maxValue;
            }

            this._value = value;
        }

        this._needForeceUpdate = true;

        this.props.onChange(value);

        this._value = null;

        const {onBlur} = this.props;

        if (onBlur) {
            onBlur(event);
        }

        if (this._needForeceUpdate) {
            this.forceUpdate();
        }
    }

    render() {
        const {className, onFocus, type} = this.props;

        const value = this.value;

        this._needForeceUpdate = false;

        const pattern = type === types.number ? '\\d*' : '.*';

        return (
            <Focusable
                ref={node => this._node = node}
                className={configClassName(style.main, className)}
                onFocus={onFocus}
                onBlur={this._onBlurHandler}
            >
                <input
                    type="text"
                    className={configClassName(style.input)}
                    pattern={pattern}
                    value={value}
                    onChange={this._onInputHandler}
                    onFocus={event => this._node.focus()}
                    onBlur={event => this._node.blur()}
                />
            </Focusable>
        );
    }
}

Input.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onInput: PropTypes.func,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
};
