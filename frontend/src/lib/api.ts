const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8000";

export async function api<T = any>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    })

    if (!res.ok) {
        let msg = `Request failed (${res.status})`;
        try {
            const data = await res.json()
            if (data?.message) msg = data.message
        } catch {}
        throw new Error(msg)
    }

    if (res.status === 204) return undefined as T
    return (await res.json()) as T
}