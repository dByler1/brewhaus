export async function fetchWrapper<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`)
      console.error('Fetch error:', error)
      throw error
    }
    return (await response.json()) as T
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
