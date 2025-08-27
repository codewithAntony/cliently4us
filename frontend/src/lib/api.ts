const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8000";

export async function api<T = any>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem('authToken')

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }

    if (options.headers) {
        if (options.headers instanceof Headers) {
            options.headers.forEach((value, key) => {
                headers[key] = value
            }) 
        } else if (Array.isArray(options.headers)) {
            options.headers.forEach(([key, value]) => {
                headers[key] = value
            })
        } else {
            Object.entries(options.headers).forEach(([key, value]) => {
                headers[key] = value as string
            })
        }
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    try {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: "include",
        headers,
        ...options,
    })

    console.log(`API ${path} response:`, res.status)

    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem('authToken')

            if (typeof window !== 'undefined') {
                window.location.href = '/auth'
            }
            throw new Error("Authentication failed. Please login again.")
        }
        
        let msg = `Request failed (${res.status})`;
        try {
            const data = await res.json()
            if (data?.message) msg = data.message
        } catch {}
        throw new Error(msg)
    }

    if (res.status === 204) return undefined as T
    return (await res.json()) as T
} catch (error) {
    console.error(`API call to ${path} failed:`, error)
    throw error
}
}