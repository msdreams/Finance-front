const BASE_URL = 'https://budgetapp.space';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  headers: Record<string, string> = {}
): Promise<T> {
  const options: RequestInit = { 
    method,
    headers: {
      ...headers, 
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(BASE_URL + url, options)
    .then(response => {

      if (!response.ok) {
        return handleError(response);
      }
      return response.json();
    });
}

export const client = {
  get: <T>(url: string, headers?: Record<string, string>) => request<T>(url, 'GET', null, headers),
  post: <T>(url: string, data: any, headers?: Record<string, string>) => request<T>(url, 'POST', data, headers),
  put: <T>(url: string, data: any, headers?: Record<string, string>) => request<T>(url, 'PUT', data, headers),
  patch: <T>(url: string, data: any, headers?: Record<string, string>) => request<T>(url, 'PATCH', data, headers),
  deleteById: (url: string, headers: Record<string, string>) => request(url, 'DELETE', null, headers),
  delete: (url: string, data: any, headers?: Record<string, string>) => request(url, 'DELETE', data, headers),

};

function handleError(response: Response): Promise<never> {
  return response.json().then((error) => {
    if (Array.isArray(error.errors)) {
      // Если `error` — массив ошибок
      const errorMessage = error.errors.join('\n');
      throw new Error(errorMessage);
    }

    if (typeof error.errors === 'string') {
      // Если `error` — строка
      throw new Error(error.errors);
    }

    if (error.message) {
      // Если есть ключ `message`
      throw new Error(error.message);
    }

    throw new Error('Unknown error occurred');
  });
}
