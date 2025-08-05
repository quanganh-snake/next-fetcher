import { normalizePath } from '@/libs/string';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type RequestOptions = RequestInit & Record<string, any>;

//#region Fetcher
class Fetcher {
    private __baseUrl: string = '';
  private __originalRequestError: boolean = false;

    constructor(baseUrl?: string) {
        this.__baseUrl = baseUrl || '';
    }

    private async _fetcher<T>(
        path: string,
        method: Method,
        body?: Record<string, any> | null,
        options?: RequestOptions,
    ): Promise<Response & { data?: T }> {
        const { headers, ...restOptions } = options || {};
        const requestInit: RequestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            ...restOptions,
        };

        if (body) {
            requestInit.body = JSON.stringify(body);
        }

        const response: Response & { data?: T } = await fetch(
            `${this.__baseUrl}/${normalizePath(path)}`,
            requestInit,
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch resource at ${this.__baseUrl}/${normalizePath(path)}`);
        }
        try {
            response.data = await response.json();
            return response;
        } catch (error) {
            console.error('Failed to parse JSON response:', error);
            throw new Error(
                `Failed to parse JSON response from ${this.__baseUrl}/${normalizePath(path)}`,
            );
        }
    }

    async get<T>(path: string, options: RequestOptions = {}) {
        return this._fetcher<T>(path, Method.GET, null, options);
    }

    async post<T>(
        path: string,
        body: Record<string, any> | null = null,
        options: RequestOptions = {},
    ) {
        return this._fetcher<T>(path, Method.POST, body, options);
    }

    async put<T>(path: string, body: Record<string, any> | null = null, options: RequestOptions = {}) {
        return this._fetcher<T>(path, Method.PUT, body, options);
    }

    async patch<T>(
        path: string,
        body: Record<string, any> | null = null,
        options: RequestOptions = {},
    ) {
        return this._fetcher<T>(path, Method.PATCH, body, options);
    }

    async delete<T>(
        path: string,
        body: Record<string, any> | null = null,
        options: RequestOptions = {},
    ) {
        return this._fetcher<T>(path, Method.DELETE, body, options);
    }
}
//#endregion
export default Fetcher;
