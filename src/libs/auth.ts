export const makeRefreshToken = async (
    refreshToken: string,
): Promise<{ access_token: string; refresh_token: string } | null> => {
    console.log('🚀 ~ makeRefreshToken ~ refreshToken:', refreshToken);
    if (!refreshToken) return null;

    const response = await fetch('https://api.escuelajs.co/api/v1/auth/refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
        console.error('Failed to refresh token:', response.statusText);
        return null;
    }
    const data = (await response.json()) as { access_token: string; refresh_token: string };
    return data;
};
