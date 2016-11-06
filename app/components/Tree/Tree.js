import React, {Component} from 'react';
import style from './buildCssMap';
import {configClassName} from '../../common/helpers';
import {SvgArrowRight, SvgLoading, Loading} from '../';
import {createLogger} from '../../common/logger';

const log = createLogger(module);

export default class Tree extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {className} = this.props;

        return (
            <div className={configClassName(style.main, className)}>
                {
                    this._renderContent()
                }
            </div>
        )
    }

    _renderContent() {
        const {columns, loading} = this.props;

        if (!columns || columns.length === 0) {
            if (loading) {
                return this._renderLoadingPanel();
            }

            return null;
        }

        return (
            <div className={style.columns}>
                {columns.map(column => this._renderColumn(column))}
            </div>
        )
    }

    _renderColumn({items = [], notLoaded}) {

        const {loading} = this.props;

        return (
            <div
                className={style.column}
                key={items.length > 0 ? items[0].id : Math.random()}
            >
                {
                    items.map(item => this._renderItem(item))
                }
                {
                    (notLoaded && loading) ? this._renderLoading(items.length === 0) : null
                }
                {
                    (items.length === 0 && !loading) ? 'Здесь ничего нет' : null
                }
            </div>
        )
    }

    _renderItem({id, name, childrenCount, isActive}) {

        const {onItemSelect} = this.props;

        return (
            <div
                className={configClassName(style.item, {[style.isActive]: isActive})}
                key={id}
                onClick={() => onItemSelect(id)}
            >
                {
                    childrenCount > 0 ? renderArrow() : null
                }
                {name}
            </div>
        )
    }

    _renderLoadingPanel() {
        return (
            <div className={style.loadingPanel}>
                {this._renderLoading(true)}
            </div>
        )
    }

    _renderLoading(fullHeight) {
        return (
            <Loading className={configClassName(style.loading, {[style.fullHeight]: fullHeight})}/>
        );
    }
}

function renderArrow() {
    return (
        <div className={style.arrow}>
            <SvgArrowRight className={style.arrowSvg}/>
        </div>
    );
}
