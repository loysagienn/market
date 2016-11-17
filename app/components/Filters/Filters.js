import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Loading, Input, Tile, Checkbox} from '../';
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
    }
    render() {

        const {loading} = this.props;

        return (
            <div
                className={style.main}
            >
                <Tile className={style.filters}>
                    {loading ? renderLoading() : this._renderFilters()}
                </Tile>
            </div>
        )
    }

    _renderFilters() {

        const {filters} = this.props;

        return filters.map(filter => this._renderFilter(filter));
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
}

function renderLoading() {
    return (
        <Loading
            className={style.loading}
            svgClassName={style.loadingSvg}
        />
    )
}
