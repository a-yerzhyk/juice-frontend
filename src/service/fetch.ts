const SERVER_ORIGIN = 'http://127.0.0.1:3000'

export async function makeRequest<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(SERVER_ORIGIN + url, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    ...options
  })
  const json = await response.json()
  if (response.ok) {
    return json
  } else {
    throw new Error(json.msg)
  }
}

async function errorHandler<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export async function get<T>(url: string) {
  return errorHandler(makeRequest<T>(url, {
    method: 'GET',
  }))
}

export async function post<T = any, U = any>(url: string, data: U | null = null) {
  return errorHandler(makeRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }))
}

export async function put<T = any, U = any>(url: string, data: U) {
  return errorHandler(makeRequest<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  }))
}

export async function remove<T>(url: string, data: T): Promise<boolean> {
  const result = await errorHandler(makeRequest<boolean>(url, {
    method: 'DELETE',
    body: JSON.stringify(data)
  }))
  return result
}