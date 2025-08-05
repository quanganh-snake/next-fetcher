import Cookies from 'js-cookie';

export const getCookieValueWithKey = (key: string): string | null => {
    if (!key) return null;

    return Cookies.get(key) || null;
};

export const setCookieWithKey = (
    key: string,
    value: string,
    options?: Cookies.CookieAttributes,
) => {
    if (!key || !value) return;

    Cookies.set(key, value, options);
};
