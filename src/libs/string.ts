export const normalizePath = (path: string): string => {
    const normalized = path.replace(/^\/+|\/+$/g, '');
    return normalized;
};
