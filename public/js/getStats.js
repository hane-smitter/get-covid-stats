const getCovidStats = (country) => {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `/pandemic?country=${country}`);
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
            reject("***Oops! An error occured!");
        }
        xhr.send();
    } );
    
}

export {
    getCovidStats
}