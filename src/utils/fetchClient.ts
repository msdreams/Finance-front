const BASE_URL = 'https://budgetapp.space';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  headers: Record<string, string> = {} // Headers can be passed here
): Promise<T> {
  const options: RequestInit = { 
    method,
    headers: {
      ...headers, // Spread existing headers
      'Content-Type': 'application/json; charset=UTF-8', // Set Content-Type if data is provided
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

export const client = {
  get: <T>(url: string, headers?: Record<string, string>) => request<T>(url, 'GET', null, headers),
  post: <T>(url: string, data: any, headers?: Record<string, string>) => request<T>(url, 'POST', data, headers),
  put: <T>(url: string, data: any, headers?: Record<string, string>) => request<T>(url, 'PUT', data, headers),
  patch: <T>(url: string, data: any, headers?: Record<string, string>) => request<T>(url, 'PATCH', data, headers),
  delete: (url: string, data: any, headers?: Record<string, string>) => request(url, 'DELETE', data, headers),
};
