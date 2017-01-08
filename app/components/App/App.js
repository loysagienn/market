import React, {Component} from 'react';
import style from './buildCssMap';
import {Header, IndexPage, ModelList, PageNotFound, Model, Settings, Filters, Examples} from '../';
import {routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';
import {configClassName} from '../../common/helpers';

const log = createLogger(module, {console: true});

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        // log.custom('render app', 'color: #009688;');

        const {routeTo} = this.props;

        return (
            <div
                className={style.main}
            >
                <Header
                    routeTo={routeTo}
                />
                {
                    this._renderPage()
                }
            </div>
        );
    }

    _renderPage() {
        const {route, models: {modelsMap}} = this.props;

        switch (route.key) {

            case routeKeys.index:

                return (
                    <div className={style.page}>
                        <IndexPage/>
                    </div>
                );

            case routeKeys.catalog:

                return (
                    <div className={configClassName(style.page, style.modelsPage)}>
                        <div className={style.modelList}>
                            <ModelList/>
                        </div>
                        <div className={style.filters}>
                            <Filters/>
                        </div>
                    </div>
                );

            case routeKeys.model:

                return (
                    <div className={style.page}>
                        <Model model={modelsMap[route.modelId]}/>
                    </div>
                );

            case routeKeys.settings:

                return (
                    <div className={style.page}>
                        <Settings/>
                    </div>
                );

            case routeKeys.examples:

                return (
                    <div className={style.page}>
                        <Examples/>
                    </div>
                );

            default:

                return (
                    <div className={style.page}>
                        <PageNotFound/>
                    </div>
                );
        }
    }
}
