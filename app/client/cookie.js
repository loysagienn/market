
import {SETTINGS_COOKIE_NAME} from '../common/constants';


export function getSettingsFromCookie() {
    const settingsStr = getCookie(SETTINGS_COOKIE_NAME);

    if (!settingsStr) {
        return;
    }

    try {
        return JSON.parse(settingsStr);
    } catch (error) {
        return;
    }
}

export function subscribeSettings({subscribe, dispatch, getState}) {

    let {settings: currentSettings} = getState();

    setSettingsCookie(currentSettings);

    subscribe(() => {
        const {settings} = getState();
        if (settings !== currentSettings) {
            setSettingsCookie(settings);
            currentSettings = settings;
        }
    })
}

function setSettingsCookie(settings) {
    setCookie(SETTINGS_COOKIE_NAME, JSON.stringify(settings), {
        expires: 60 * 60 * 24 * 7,
        path: '/'
    })
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}
