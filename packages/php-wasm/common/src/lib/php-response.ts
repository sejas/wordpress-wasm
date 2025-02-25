/*
 * This type is used in Comlink.transferHandlers.set('PHPResponse', { ... })
 * so be sure to update that if you change this type.
 */
export interface PHPResponseData {
	/**
	 * Response headers.
	 */
	readonly headers: Record<string, string[]>;

	/**
	 * Response body. Contains the output from `echo`,
	 * `print`, inline HTML etc.
	 */
	readonly bytes: ArrayBuffer;

	/**
	 * Stderr contents, if any.
	 */
	readonly errors: string;

	/**
	 * The exit code of the script. `0` is a success, while
	 * `1` and `2` indicate an error.
	 */
	readonly exitCode: number;

	/**
	 * Response HTTP status code, e.g. 200.
	 */
	readonly httpStatusCode: number;
}

/**
 * PHP response. Body is an `ArrayBuffer` because it can
 * contain binary data.
 *
 * This type is used in Comlink.transferHandlers.set('PHPResponse', { ... })
 * so be sure to update that if you change this type.
 */
export class PHPResponse implements PHPResponseData {
	/** @inheritDoc */
	readonly headers: Record<string, string[]>;

	/** @inheritDoc */
	readonly bytes: ArrayBuffer;

	/** @inheritDoc */
	readonly errors: string;

	/** @inheritDoc */
	readonly exitCode: number;

	/** @inheritDoc */
	readonly httpStatusCode: number;

	constructor(
		httpStatusCode: number,
		headers: Record<string, string[]>,
		body: ArrayBuffer,
		errors = '',
		exitCode = 0
	) {
		this.httpStatusCode = httpStatusCode;
		this.headers = headers;
		this.bytes = body;
		this.exitCode = exitCode;
		this.errors = errors;
	}

	static fromRawData(data: PHPResponseData): PHPResponse {
		return new PHPResponse(
			data.httpStatusCode,
			data.headers,
			data.bytes,
			data.errors,
			data.exitCode
		);
	}

	toRawData(): PHPResponseData {
		return {
			headers: this.headers,
			bytes: this.bytes,
			errors: this.errors,
			exitCode: this.exitCode,
			httpStatusCode: this.httpStatusCode,
		};
	}

	/**
	 * Response body as JSON.
	 */
	get json() {
		return JSON.parse(this.text);
	}

	/**
	 * Response body as text.
	 */
	get text() {
		return new TextDecoder().decode(this.bytes);
	}
}
