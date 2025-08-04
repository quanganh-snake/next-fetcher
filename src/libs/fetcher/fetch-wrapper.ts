import { normalizePath } from '@/libs/string';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type RequestOptions = RequestInit & Record<string, any>;

//#region FetchWrapper
class FetchWrapper {
  private __baseUrl: string = '';

  constructor(baseUrl?: string) {
    this.__baseUrl = baseUrl || '';
  }

  private async fetcher(path: string,
    method: Method,
    body?: Record<string, any> | null,
    options?: RequestOptions): Promise<Response & { data?: unknown }> {

    const { headers, ...restOptions } = options || {};
    const requestInit: RequestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(headers),
      },
      ...restOptions,
    };

    if (body) {
      requestInit.body = JSON.stringify(body);
    }

    const response: Response & { data?: unknown } = await fetch(`${this.__baseUrl}/${normalizePath(path)}`, requestInit);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource at ${this.__baseUrl}/${normalizePath(path)}`);
    }
    try {
      response.data = await response.json();
      return response;
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      throw new Error(`Failed to parse JSON response from ${this.__baseUrl}/${normalizePath(path)}`);
    }
  }

  async get(path: string, options: RequestOptions = {}) {
    return this.fetcher(path, Method.GET, null, options);
  }

  async post(path: string, body: Record<string, any> | null = null, options: RequestOptions = {}) {
    return this.fetcher(path, Method.POST, body, options);
  }

  async put(path: string, body: Record<string, any> | null = null, options: RequestOptions = {}) {
    return this.fetcher(path, Method.PUT, body, options);
  }

  async patch(path: string, body: Record<string, any> | null = null, options: RequestOptions = {}) {
    return this.fetcher(path, Method.PATCH, body, options);
  }

  async delete(path: string, body: Record<string, any> | null = null, options: RequestOptions = {}) {
    return this.fetcher(path, Method.DELETE, body, options);
  }

}
//#endregion
export default FetchWrapper;
