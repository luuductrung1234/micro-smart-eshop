import fetch from 'unfetch';

const checkStatus = (response) => {
    if (response.ok) {
        return response.json();
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const getAllStudents = () => fetch('api/v1/students', {headers}).then(checkStatus);
