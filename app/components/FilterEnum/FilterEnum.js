import React, {Component, PropTypes} from 'react';
import {Checkbox, FilterBox} from '../';
import style from './buildCssMap';


export default class FilterEnum extends Component {
    constructor(props) {
        super(props);
    }

    _toggleItem(valueId) {
        const {routeToFilter, filter: {key}} = this.props;

        if (this._selected[valueId]) {
            delete this._selected[valueId];
        } else {
            this._selected[valueId] = true;
        }
        routeToFilter({[key]: Object.keys(this._selected).join(',') || null});
    }

    render() {
        const {selected = ''} = this.props;

        this._selected = selected
            .split(',')
            .reduce((items, key) => key ? Object.assign(items, {[key]: true}) : items, {});

        const {filter: {options}} = this.props;

        return (
            <div>
                {options.map(option => this._renderEnumOption(option))}
            </div>
        );
    }

    _renderEnumOption({valueId, valueText}) {

        const checked = valueId in this._selected;

        return (
            <div
                key={valueId}
                onClick={() => this._toggleItem(valueId)}
                className={style.filterItem}
            >
                <Checkbox checked={checked} className={style.checkbox}/>
                {valueText}
            </div>
        );
    }
}

FilterEnum.propTypes = {
    routeToFilter: PropTypes.func.isRequired,
    filter: PropTypes.object,
    selected: PropTypes.string
};
