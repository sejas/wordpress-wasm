export interface SemaphoreOptions {
	concurrency: number;
}

export default class Semaphore {
	private _running = 0;
	private concurrency: number;
	private queue: (() => void)[];

	constructor({ concurrency }: SemaphoreOptions) {
		this.concurrency = concurrency;
		this.queue = [];
	}

	get running(): number {
		return this._running;
	}

	async acquire(): Promise<() => void> {
		while (true) {
			if (this._running >= this.concurrency) {
				// Concurrency exhausted – wait until a lock is released:
				await new Promise<void>((resolve) => this.queue.push(resolve));
			} else {
				// Acquire the lock:
				this._running++;
				return () => {
					this._running--;
					// Release the lock:
					if (this.queue.length > 0) {
						this.queue.shift()!();
					}
				};
			}
		}
	}
}
