import React, {Component} from 'react';
import style from './buildCssMap';
import {Checkbox} from '../';

const settingsText = {
    serverRenderingOn: {
        title: 'Включить серверный рендеринг',
        description: 'При первоначальной загрузке страница будет отрендерна на сервере'
    },
    preloadDataOnServer: {
        title: 'Предзагружать данные для отображения страницы на сервере',
        description: 'Все данные, необходимые для отображения текущей страницы, будут загружены на сервере и приедут на клиент вместе со страницей, в противном случае на клиент приедет "пустая страница" со спиннерами и все необходимые запросы будут отправлены уже с клиента'
    },
    showCategoryTreeOnHover: {
        title: 'Показывать дерево категорий при наведении на список'
    }
};

export default class Settings extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {settings, changeSettings} = this.props;

        return (
            <div className={style.main}>
                {
                    Object.keys(settings).map(key => this._renderSettings(key, settings[key]))
                }
            </div>
        );
    }

    _renderSettings(key, checked) {

        const {title, description} = settingsText[key];
        const {changeSettings} = this.props;

        return (
            <div
                className={style.settings}
                onClick={event => changeSettings({[key]: !checked})}
                key={key}
            >
                <Checkbox
                    checked={checked}
                    theme="white"
                    className={style.checkbox}
                />
                <div className={style.text}>
                    <div className={style.title}>{title}</div>
                    {description && <div className={style.description}>{description}</div>}
                </div>
            </div>
        )
    }
}
