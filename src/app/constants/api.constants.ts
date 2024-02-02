export const apiUris = {
    register: '/auth/register',
    login: '/auth/login',
};

export const postObject = (body: object) => {
    return {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
