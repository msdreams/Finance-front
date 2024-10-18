const BASE_URL = 'https://budgetapp.space';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

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
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any, headers?: Record<string, string>) => request<T>(url, 'POST', data, headers), // Change made here
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
