import React from 'react';
import style from './buildCssMap';
import {Header, IndexPage, ModelList, PageNotFound, Model, Settings, Filters, ShowHide} from '../';
import {routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';
import {configClassName} from '../../common/helpers';

const log = createLogger(module, {console: true});

export default function({routeTo, route, models}) {

    log.custom('render app', 'color: #009688;');

    return (
        <div
            className={style.main}
        >
            <Header
                routeTo={routeTo}
            />
            {
                renderPage({route, models, routeTo})
            }
        </div>
    );
}

function renderPage({route, models: {modelsMap}, routeTo}) {

    switch (route.key) {

        case routeKeys.index:

            return (
                <div className={style.page}>
                    <IndexPage/>
                </div>
            );

        case routeKeys.models:

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

        default:

            return (
                <div className={style.page}>
                    <PageNotFound/>
                </div>
            );
    }
}
