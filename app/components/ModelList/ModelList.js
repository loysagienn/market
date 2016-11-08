import React, {Component} from 'react';
import style from './buildCssMap';
import {Loading, ModelTile, SvgLoading} from '../';



const SCROLL_SPACE_BEFORE_LOAD = 300;

export default class ModelList extends Component {
    constructor(props) {
        super(props);
    }
    _onScroll(event) {
        const {scrollHeight, clientHeight, scrollTop} = this._listNode;

        if ((scrollHeight - (clientHeight + scrollTop)) < SCROLL_SPACE_BEFORE_LOAD) {
            this.props.loadMoreModels();
        }
    }
    render() {
        const {loading, currentFilter} = this.props;

        return (
            <div
                className={style.main}
                ref={node => this._listNode = node}
                onScroll={event => this._onScroll(event)}
            >
                {loading && currentFilter.length === 0 ? renderLoading() : this._renderModels()}
            </div>
        )
    }

    _renderModels() {
        const {currentFilter, modelsMap, offersMap, routeTo} = this.props;

        if (currentFilter.length === 0) {
            return null;
        }

        return (
            <div className={style.models}>
                {
                    currentFilter.reduce(
                        (renderedModels, list) => renderedModels.concat(list.map(({modelId, offerId}) => ModelTile({
                            model: modelId ? modelsMap[modelId] : null,
                            offer: offerId ? offersMap[offerId] : null,
                            routeTo
                        }))),
                        []
                    )
                }
                {
                    this._renderMoreLoadingSpinner()
                }
            </div>
        );
    }

    _renderMoreLoadingSpinner() {
        const {loading} = this.props;

        if (!loading) {
            return null;
        }

        return (
            <div className={style.moreLoading}>
                <SvgLoading className={style.loadingSvg}/>
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
