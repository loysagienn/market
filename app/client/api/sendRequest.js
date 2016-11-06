import {stringifyQueryParams} from '../../common/helpers';


export default function sendRequest(name, params = {}, { method = 'GET'} = {}) {

    const url = '/api/' + name + stringifyQueryParams(params);

    return new Promise((resolve, reject) => {
        fetch(url, {method})
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    reject(data.errors);
                } else {
                    resolve(data.result);
                }
            })
            .catch(
                error => reject([error])
            );
    });
}
