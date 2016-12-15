import React, {Component, PropTypes} from 'react';
import {configClassName} from '../../common/helpers';
import {Focusable, ShowHide, SvgArrowUp, SvgDot} from '../';
import style from './buildCssMap';


export default class FilterBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        };

        this._onNameClickHandler = event => this._onNameClick(event);
    }

    render() {
        const {isFocused} = this.state;

        return (
            <Focusable
                className={configClassName(style.main, {[style.isFocused]: isFocused})}
                onFocus={() => this.setState({isFocused: true})}
                onBlur={() => this.setState({isFocused: false})}
                ref={focusable => this._focusable = focusable}
            >
                {this._renderFilterName()}
                <ShowHide animationType="height">
                    {this._renderFilterContent()}
                </ShowHide>
            </Focusable>
        )
    }

    _renderFilterName() {

        return (
            <div
                className={configClassName(style.name, {[style.isFocused]: this.state.isFocused})}
                onClick={this._onNameClickHandler}
            >
                {this.props.name}
                {this._renderNameIcon()}
            </div>
        );
    }

    _renderNameIcon() {

        if (this.state.isFocused) {
            return (
                <SvgArrowUp className={configClassName(style.nameIcon, style.arrowUpIcon)}/>
            );
        }

        if (this.props.active) {
            return (
                <SvgDot className={configClassName(style.nameIcon, style.dotIcon)}/>
            );
        }

        return null;
    }

    _onNameClick(event) {
        if (this.state.isFocused) {
            event.nativeEvent.preventFocus = true;

            this._focusable.blur();
        }
    }

    _renderFilterContent() {
        if (!this.state.isFocused) {
            return null;
        }

        return (
            <div className={style.filterContent}>
                {this.props.children}
            </div>
        );
    }
}

FilterBox.propTypes = {
    name: PropTypes.string.isRequired,
    active: PropTypes.any
};
