import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Focusable} from '../';


const types = {
    number: 'number'
};

export default class Input extends Component {
    constructor(props) {
        super(props);

        this._onChangeHandler = event => this._onChange(event);
        this._needForeceUpdate = false;

        this._value = this.props.value;
    }
    get value() {
        return this._value;
    }
    componentWillReceiveProps(newProps) {
        this._value = newProps.value;
    }
    _onChange(event) {

        let value;

        if (this.props.type === types.number) {

            value = +event.target.value;

            if (isNaN(value)) {
                value = this.props.value;
            } else {
                const {minValue = null, maxValue = null} = this.props;

                if (minValue !== null && value < minValue) {
                    value = minValue
                }

                if (maxValue !== null && value > maxValue) {
                    value = maxValue;
                }
            }
        } else {
            value = event.target.value;
        }

        if (value === this.props.value) {
            return;
        }

        this._needForeceUpdate = true;

        this._value = value;

        this.props.onChange(value);

        if (this._needForeceUpdate) {
            this._value = this.props.value;
            this.forceUpdate();
        }
    }
    focus() {
        this._input.focus();
    }
    render() {
        const {className, onFocus, onBlur, value} = this.props;

        this._needForeceUpdate = false;

        return (
            <Focusable
                ref={node => this._node = node}
                className={configClassName(style.main, className)}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <input
                    ref={input => this._input = input}
                    className={configClassName(style.input)}
                    value={value}
                    onChange={this._onChangeHandler}
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
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
};
