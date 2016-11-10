import React, {Component} from 'react';
import style from './buildCssMap';
import {Loading, ModelTile, SvgLoading} from '../';



const SCROLL_SPACE_BEFORE_LOAD = 300;

export default class ModelList extends Component {
    constructor(props) {
        super(props);
    }
    _onScroll(event) {
        this._loadMoreModels();
    }
    componentDidMount() {
        this._loadMoreModels();
    }
    componentDidUpdate() {
        this._loadMoreModels();
    }
    _loadMoreModels() {
        const {scrollHeight, clientHeight, scrollTop} = this._listNode;

        console.log('load more models');

        if (this._loadMoreStart) {
            return;
        }

        if ((scrollHeight - (clientHeight + scrollTop)) < SCROLL_SPACE_BEFORE_LOAD) {
            this._loadMoreStart = true;
            this.props.loadMoreModels();
        }
    }
    render() {
        const {modelsLoading, modelsIds} = this.props;

        this._loadMoreStart = false;

        return (
            <div
                className={style.main}
                ref={node => this._listNode = node}
                onScroll={event => this._onScroll(event)}
            >
                {modelsLoading && modelsIds.length === 0 ? renderLoading() : this._renderModels()}
            </div>
        )
    }

    _renderModels() {
        const {modelsIds, modelsMap, offersMap, routeTo} = this.props;

        if (modelsIds.length === 0) {
            return null;
        }

        return (
            <div className={style.models}>
                {
                    modelsIds.reduce(
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
        const {modelsLoading} = this.props;

        if (!modelsLoading) {
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
