import config from '../../config';


export default function renderHtml({html = '', initialState = {}} = {}) {

    initialState = Object.assign(initialState, {api: null});

    const initialStateString = JSON.stringify(initialState);

    return `<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, maximum-scale=1.0"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="address=no">
    <link href='https://fonts.googleapis.com/css?family=Roboto&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/market/build/app.css">
</head>
<body>
    
<div class="app" id="app">${html}</div>
    
<script>
    window.__INITIAL_STATE__ = ${initialStateString};
</script>
<script src = "${config.reduxUrl}"></script>
<script src = "${config.reactUrl}"></script>
<script src = "${config.reactDomUrl}"></script>
<script src = "${config.reactReduxUrl}"></script>
<script src = "/market/build/app.js"></script>

</body>
</html>`;
}
