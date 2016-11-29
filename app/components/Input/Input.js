import React, {Component, PropTypes} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Focusable} from '../';


export default class Input extends Component {
    constructor(props) {
        super(props);

        this._onChangeHandler = event => this._onChange(event);
    }
    get value() {
        return this._input.value;
    }
    _onChange(event) {
        this.props.onChange(event.target.value);
    }
    render() {
        const {className, onFocus, onBlur, value} = this.props;

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

Input.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};
