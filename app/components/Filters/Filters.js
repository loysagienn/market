import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Loading, Input, Tile, Checkbox, Focusable, SvgFilter, Button} from '../';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});

const filterTypes = {
    NUMERIC: 'NUMERIC',
    ENUMERATOR: 'ENUMERATOR',
    BOOL: 'BOOL'
};

export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        }
    }
    render() {

        const {loading} = this.props;
        const {isFocused} = this.state;

        return (
            <Focusable
                className={configClassName(style.main, {[style.focused]: isFocused})}
                onFocus={event => this.setState({isFocused: true})}
                onBlur={event => this.setState({isFocused: false})}
                ref={node => this._mainNode = node}
            >
                <Tile className={style.filters}>
                    {loading ? renderLoading() : this._renderFilters()}
                </Tile>
                <div className={style.filterBtn}>
                    <SvgFilter className={style.filterBtnSvg}/>
                </div>
            </Focusable>
        )
    }

    _renderFilters() {

        const {filters} = this.props;

        return (
            <div>
                {filters.map(filter => this._renderFilter(filter))}
                <div
                    className={style.buttons}
                >
                    <Button
                        className={style.button}
                        onClick={event => {
                            event.nativeEvent.preventFocus = true;
                            this._mainNode.blur();
                        }}
                    >
                        OK
                    </Button>
                </div>
            </div>
        );
    }

    _renderFilter(filter) {

        const {id} = filter;

        return (
            <div
                key={id}
                className={style.filterWrapper}
            >
                {
                    this._renderFilterNode(filter)
                }
            </div>
        )
    }

    _renderFilterNode(filter) {
        switch (filter.type) {
            case filterTypes.NUMERIC:

                return this._renderNumeric(filter);

            case filterTypes.BOOL:

                return this._renderBool(filter);

            case filterTypes.ENUMERATOR:

                return this._renderEnumator(filter);

            default:

                return `${filter.name} ${filter.type}`;
        }
    }

    _renderNumeric(filter) {

        let {key, name} = filter;

        const {routeToActualFilter, updateFilter, values} = this.props;

        const value = values[key];

        name = name.charAt(0).toUpperCase() + name.slice(1);

        return (
            <div className={configClassName(style.filter, style.filterNumeric)}>
                <div className={style.filterName}>
                    {name}
                </div>
                <div className={style.filterControl}>
                    <Input
                        value={value || ''}
                        onChange={value => updateFilter({[key]: value || null})}
                        className={style.input}
                        onBlur={routeToActualFilter}
                    />
                </div>
            </div>
        );
    }

    _renderBool(filter) {

        let {key, name} = filter;

        const {routeToActualFilter, updateFilter, values} = this.props;

        const checked = values[key];

        name = name.charAt(0).toUpperCase() + name.slice(1);

        const onClick = () => {
            updateFilter({[key]: !checked || null});
            routeToActualFilter();
        };

        return (
            <div className={configClassName(style.filter, style.filterBool)}>
                <div
                    className={style.filterName}
                    onClick={onClick}
                >
                    <Checkbox
                        checked={checked}
                        className={style.checkbox}
                    />
                    {name}
                </div>
            </div>
        );
    }

    _renderEnumator(filter) {

        const {key} = filter;

        const {routeToActualFilter, updateFilter, values} = this.props;

        return (
            <FilterEnumator
                routeToActualFilter={routeToActualFilter}
                updateFilter={updateFilter}
                selectedItems={values[key]}
                filter={filter}
            />
        );
    }
}

class FilterEnumator extends Component {
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
                className={configClassName(style.filter, style.filterEnumator)}
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
                {this._renderFilterControl()}
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
            return;
        }

        const {filter: {options}} = this.props;

        return (
            <div className={style.filterControl}>
                {options.map(option => this._renderEnumatorOption(option))}
            </div>
        )
    }

    _renderEnumatorOption({type, valueId, valueText}) {
        const checked = valueId in this._selectedItems;

        return (
            <div
                key={valueId}
                onClick={() => this._toggleItem(valueId)}
                className={style.enumatorFilterItem}
            >
                <Checkbox checked={checked} className={style.checkbox}/>
                {valueText}
            </div>
        )
    }
}

function renderLoading() {
    return (
        <Loading
            className={style.loading}
            svgClassName={style.loadingSvg}
        />
    )
}
