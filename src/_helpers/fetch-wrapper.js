function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: {}
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }

        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

async function handleResponse(response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    return data;
}

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
};