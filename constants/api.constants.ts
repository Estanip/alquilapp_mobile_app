export const apiUris = {
    register: '/auth/register',
    login: '/auth/login',
};

export const apiPost = (url: string, body: object) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((response) => response);
};
