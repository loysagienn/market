import React from 'react';
import style from './buildCssMap';
import {CategoriesTree, IndexPage, ModelList, PageNotFound, Model, Settings} from '../';
import {routeKeys} from '../../common/router/router';
import {createLogger} from '../../common/logger';

const log = createLogger(module, {console: true});

export default function({routeTo, route, models}) {

    log.info('render app');

    return (
        <div
            className={style.main}
        >
            <CategoriesTree/>
            <div className={style.page}>
                {
                    renderPage({route, models, routeTo})
                }
            </div>
        </div>
    );
}

function renderPage({route, models: {modelsMap}, routeTo}) {

    switch (route.key) {

        case routeKeys.index:

            return IndexPage();

        case routeKeys.models:

            return (
                <ModelList />
            );

        case routeKeys.model:

            return (
                <Model
                    model={modelsMap[route.modelId]}
                />
            );

        case routeKeys.settings:

            return (
                <Settings/>
            );

        default:

            return (
                <PageNotFound/>
            );
    }
}
