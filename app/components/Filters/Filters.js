import React, {Component} from 'react';
import style from './buildCssMap';
import {Loading, Tile} from '../';


export default class Filters extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {filters, loading, routeTo} = this.props;

        return (
            <div className={style.main}>
                {loading ? renderLoading() : this._renderFilters()}
            </div>
        )
    }

    _renderFilters() {

        const {filters} = this.props;

        return filters.map(filter => this._renderFilter(filter));
    }

    _renderFilter(filter) {

        let {id, name, type} = filter;

        const {routeTo} = this.props;

        name = name.charAt(0).toUpperCase() + name.slice(1);

        return (
            <div
                key={id}
                className={style.filterWrapper}
            >
                <div className={style.filter}>
                    {name}
                    <br/>
                    {type}
                </div>
            </div>
        )
    }
}

function numeric({maxValue = null, minValue = null, onChange}) {

}

function renderLoading() {
    return (
        <Loading
            className={style.loading}
            svgClassName={style.loadingSvg}
        />
    )
}
