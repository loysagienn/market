import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Focusable} from '../';


export default class Input extends Component {
    constructor(props) {
        super(props);
        this._setValue(props.value);

        this._onChangeHandler = event => this._onChange(event);
    }
    componentWillReceiveProps(nextProps) {
        this._setValue(nextProps.value);
    }
    _setValue(value) {
        return this._value = value;
    }
    get value() {
        return this._value;
    }
    _onChange(event) {
        const prevValue = this._value;
        const value = this._setValue(event.target.value);

        if (value === prevValue) {
            return;
        }

        // this.forceUpdate();
        this.props.onChange(value);
    }
    render() {
        const {className, onFocus, onBlur} = this.props;

        const value = this._value;

        return (
            <Focusable
                ref={node => this._node = node}
                className={configClassName(style.main)}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <input
                    ref={input => this._input = input}
                    className={configClassName(style.input, className)}
                    value={value}
                    onChange={this._onChangeHandler}
                    onFocus={event => this._node.focus()}
                    onBlur={event => this._node.blur()}
                />
            </Focusable>
        );
    }
}
