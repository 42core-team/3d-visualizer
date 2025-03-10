interface ReplayTick {
	objects: any[];
	actions: any[];
}

interface ReplayData {
	ticks: { [tick: string]: ReplayTick };
	full_tick_amount: number;
}

type State = { [id: string]: any };

function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

class ReplayLoader {
	private replayData: ReplayData = { ticks: {}, full_tick_amount: 0 };
	private cache: Map<number, State>;
	private cacheInterval: number;

	constructor(cacheInterval: number = 25) {
		this.cacheInterval = cacheInterval;
		this.cache = new Map<number, State>();
	}

	public async loadReplay(filePath: string): Promise<void> {
		await fetch(filePath)
			.then(response => response.json())
			.then((json) => {
				this.replayData = json;
				let fullState: State = {};
				const tick0 = this.replayData.ticks["0"];
				if (tick0 && tick0.objects) {
					for (const obj of tick0.objects) {
						fullState[obj.id] = deepClone(obj);
					}
				}
				this.cache.set(0, deepClone(fullState));

				const totalTicks = this.replayData.full_tick_amount;
				for (let t = 1; t <= totalTicks; t++) {
					const tickData = this.replayData.ticks[t.toString()];
					if (tickData && tickData.objects) {
						this.applyDiff(fullState, tickData);
					}
					if (t % this.cacheInterval === 0) {
						this.cache.set(t, deepClone(fullState));
					}
				}
				console.log("Replay loaded with snapshots at intervals:", Array.from(this.cache.keys()));
			})
			.catch((err) => {
				console.log("Failed to load Replay: ", err);
			});
	}

	private applyDiff(state: State, tickData: ReplayTick): void {
		for (const diffObj of tickData.objects) {
			const id = diffObj.id;
			if (state[id]) {
				Object.assign(state[id], diffObj);
			} else {
				state[id] = deepClone(diffObj);
			}
		}
	}

	public getStateAt(tick: number): any {
		if (tick < 0 || tick > this.replayData.full_tick_amount) {
			throw new Error("Tick out of range");
		}
		let snapshotTick = -1;
		for (let key of this.cache.keys()) {
			if (key <= tick && key > snapshotTick) {
				snapshotTick = key;
			}
		}
		if (snapshotTick === -1) {
			throw new Error("No snapshot found");
		}
		let cachedState = this.cache.get(snapshotTick);
		if (!cachedState) {
			throw new Error("Cached state not found");
		}
		let state: State = deepClone(cachedState);
		for (let t = snapshotTick + 1; t <= tick; t++) {
			const tickData = this.replayData.ticks[t.toString()];
			if (tickData && tickData.objects) {
				this.applyDiff(state, tickData);
			}
		}
		return { objects: Object.values(state) };
	}
}

let replayLoader: ReplayLoader | null = null;

export async function loadReplay(filePath: string, cacheInterval: number = 25): Promise<void> {
	replayLoader = new ReplayLoader(cacheInterval);
	await replayLoader.loadReplay(filePath)
		.then(() => {
			console.log("Replay loaded!");
		})
		.catch((err) => {
			console.log("Failed to load Replay: ", err);
		});
}

export function getStateAt(tick: number): any {
	if (!replayLoader) {
		throw new Error("Replay not loaded. Please call loadReplay first.");
	}
	return replayLoader.getStateAt(tick);
}