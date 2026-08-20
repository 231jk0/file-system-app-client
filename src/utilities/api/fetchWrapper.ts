export class FetchWrapper {
	constructor(private readonly baseURL: string) {
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		const response = await fetch(`${this.baseURL}${endpoint}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		});

		if (!response.ok) {
			throw await this.createHttpError(response);
		}

		return response.json() as Promise<T>;
	}

	private async createHttpError(response: Response): Promise<Error> {
		let message = `HTTP error! status: ${response.status}`;

		try {
			const body = await response.json();

			if (typeof body?.error === 'string') {
				message = body.error;
			}
		} catch {
			// Response isn't JSON.
		}

		return new Error(message);
	}

	get<T>(
		endpoint: string,
		headers?: Record<string, string>,
		signal?: AbortSignal,
	): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'GET',
			headers,
			signal,
		});
	}

	post<T, B = unknown>(
		endpoint: string,
		body: B,
		headers?: Record<string, string>,
		signal?: AbortSignal,
	): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
			signal,
		});
	}

	delete<T>(
		endpoint: string,
		headers?: Record<string, string>,
		signal?: AbortSignal,
	): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'DELETE',
			headers,
			signal,
		});
	}
}
