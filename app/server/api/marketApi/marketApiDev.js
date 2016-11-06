
import http from 'http';
import {stringifyQueryParams} from '../../../common/helpers';


const HOSTNAME = 'market.vajs.pro';


export default ({params, ip, methodName}) => new Promise((resolve, reject) => {

    const paramsString = stringifyQueryParams(params);

    var options = {
        hostname: HOSTNAME,
        path: `/api/${methodName}${paramsString}`,
        method: 'GET'
    };

    const request = http.request(options, res => {

        let resultStr = '';

        res.on('data', chunk => resultStr += chunk.toString());

        res.on('end', () => {
            try {
                const {result, errors} = JSON.parse(resultStr);

                if (errors && errors.length > 0)
                    reject(errors, 500);
                else
                    resolve(result);

            } catch (error) {
                reject([error], 500);
            }
        })
    });

    request.on('error', error => reject(['send request error'], 500));

    request.end();
});
