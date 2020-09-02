const getCovidStats = () => {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `/pandemic`);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300) {
                return resolve(xhr.response);
            }
            let { msg } = xhr.response;
            reject({
                "code": xhr.status,
                "codeText": xhr.statusText,
                msg
            });
        }
        xhr.onerror = () => {
            reject("***Oops! Network error occured!");
        }
        xhr.send();
    } );
    
}

const getCovidStats2 = ( countryName ) => {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `/pandemic2?country=${countryName}`);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300) {
                return resolve(xhr.response);
            }
            let { err } = xhr.response;
            reject({
                "code": xhr.status,
                "codeText": xhr.statusText,
                err
            });
        }
        xhr.onerror = () => {
            reject("***Oops! Network error occured!");
        }
        xhr.send();
    } );
}

export {
    getCovidStats,
    getCovidStats2
}