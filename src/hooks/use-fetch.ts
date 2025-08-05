import { getCookieValueWithKey } from '@/libs/cookie.lib';
import { useEffect, useState } from 'react';

export const useFetch = () => {
    const [token, setToken] = useState<{
        accessToken: string;
        refreshToken: string;
    } | null>(null);

    useEffect(() => {
        const accessToken = getCookieValueWithKey('accessToken');
        const refreshToken = getCookieValueWithKey('refreshToken');

        if (!accessToken && !refreshToken) {
            setToken(null);
            return;
        }

        if (accessToken && refreshToken) {
            setToken({ accessToken, refreshToken });
        }
    }, []);

    return {
        token,
        setToken,
    };
};
