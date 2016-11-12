import React, {Component} from 'react';
import style from './buildCssMap';
import {Loading, Input, Tile} from '../';

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
            <div className={style.main}>
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

        let {id, name, type} = filter;

        const {routeToActualFilter, updateFilter, values} = this.props;

        name = name.charAt(0).toUpperCase() + name.slice(1);

        return (
            <div
                key={id}
                className={style.filterWrapper}
            >
                <div className={style.filter}>
                    <div className={style.filterName}>
                        {name}
                    </div>
                    <div className={style.filterControl}>
                        {renderFilterControl(filter, values[id], updateFilter, routeToActualFilter)}
                    </div>
                </div>
            </div>
        )
    }
}

function renderFilterControl(filter, value, updateFilter, onBlur) {
    const {type, id} = filter;

    const onChange = value => updateFilter({id, value});

    switch (type) {
        case filterTypes.NUMERIC:

            return renderNumeric(filter, value, onChange, onBlur);
    }

    return type;
}

function renderNumeric({maxValue = null, minValue = null}, value, onChange, onBlur) {
    return (
        <Input value={value || ''} onChange={onChange} className={style.input} onBlur={onBlur}/>
    );
}

function renderLoading() {
    return (
        <Loading
            className={style.loading}
            svgClassName={style.loadingSvg}
        />
    )
}
