import React, {Component} from 'react';
import {configClassName} from '../../common/helpers';
import {Focusable, Checkbox, ShowHide} from '../';
import style from './buildCssMap';


export default class FilterEnum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        };

        this._onNameClickHandler = event => this._onNameClick(event);
    }

    _toggleItem(valueId) {
        const {routeToActualFilter, updateFilter, filter: {key}} = this.props;

        if (this._selectedItems[valueId]) {
            delete this._selectedItems[valueId];
        } else {
            this._selectedItems[valueId] = true;
        }
        updateFilter({[key]: Object.keys(this._selectedItems).join(',') || null});
        routeToActualFilter();
    }

    render() {
        const {filter: {name}, selectedItems = ''} = this.props;

        this._selectedItems = selectedItems
            .split(',')
            .reduce((items, key) => key ? Object.assign(items, {[key]: true}) : items, {});

        return (
            <Focusable
                className={configClassName(style.filter)}
                onFocus={() => this.setState({isFocused: true})}
                onBlur={() => this.setState({isFocused: false})}
                ref={focusable => this._focusable = focusable}
            >
                <div
                    className={style.filterName}
                    onClick={this._onNameClickHandler}
                >
                    {name}
                </div>
                <ShowHide
                    animationType="height"
                >
                    {this._renderFilterControl()}
                </ShowHide>
            </Focusable>
        )
    }

    _onNameClick(event) {
        if (this.state.isFocused) {
            event.nativeEvent.preventFocus = true;

            this._focusable.blur();
        }
    }

    _renderFilterControl() {
        if (!this.state.isFocused) {
            return null;
        }

        const {filter: {options}} = this.props;

        return (
            <div className={style.filterControl}>
                {options.map(option => this._renderEnumOption(option))}
            </div>
        )
    }

    _renderEnumOption({type, valueId, valueText}) {
        const checked = valueId in this._selectedItems;

        return (
            <div
                key={valueId}
                onClick={() => this._toggleItem(valueId)}
                className={style.filterItem}
            >
                <Checkbox checked={checked} className={style.checkbox}/>
                {valueText}
            </div>
        )
    }
}
