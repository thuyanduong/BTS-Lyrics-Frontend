function getParameterByType(type, url) {
    type = type.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + type + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export {getParameterByType}
