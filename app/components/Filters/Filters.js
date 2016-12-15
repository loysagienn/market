import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {Loading, Tile, Focusable, SvgFilter, Button, FilterEnum, FilterNumeric, FilterBool, FilterBox} from '../';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});


export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        };

        this._filterComponents = {
            NUMERIC: FilterNumeric,
            ENUMERATOR: FilterEnum,
            BOOL: FilterBool
        }
    }

    render() {
        const {isFocused} = this.state;

        return (
            <Focusable
                className={configClassName(style.main, {[style.focused]: isFocused})}
                onFocus={event => this.setState({isFocused: true})}
                onBlur={event => this.setState({isFocused: false})}
                ref={node => this._mainNode = node}
            >

                {this._renderFilters()}

                {this._renderButtons()}

                {renderOpenFiltersBtn()}

            </Focusable>
        )
    }

    _renderButtons() {

        return (
            <div className={style.buttons}>
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
        );
    }

    _renderFilters() {

        const {filters, loading} = this.props;

        return (
            <div className={style.filters}>
                <Tile className={style.filtersTile}>
                    {
                        loading
                            ? renderLoading()
                            : filters.map(filter => this._renderFilter(filter))
                    }
                </Tile>
            </div>
        );
    }

    _renderFilter(filter) {

        const {id, key, name} = filter;

        const {values} = this.props;
        
        return (
            <FilterBox
                key={id}
                name={name.charAt(0).toUpperCase() + name.slice(1)}
                active={key in values}
            >
                {
                    this._renderFilterNode(filter)
                }
            </FilterBox>
        );
    }

    _renderFilterNode(filter) {
        const {key} = filter;
        const {routeToFilter, values} = this.props;

        if (filter.type in this._filterComponents) {
            const FilterComponent = this._filterComponents[filter.type];

            return (
                <FilterComponent
                    filter={filter}
                    selected={values[key]}
                    routeToFilter={routeToFilter}
                />
            );
        }

        return `Возможность редактирования фильтра ${filter.type} еще не реализована`;
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

function renderOpenFiltersBtn() {
    return (
        <div className={style.filterBtn}>
            <SvgFilter className={style.filterBtnSvg}/>
        </div>
    );
}
