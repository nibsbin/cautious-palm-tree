import { get } from 'svelte/store';

import { clampLove, loveDecayForTickMs, moneyPerTick, TICK_INTERVAL_MS } from './economy';
import { love, money } from './state';

let handle: ReturnType<typeof setInterval> | undefined;

/** Starts the fixed-step tick loop; returns a disposer. Safe to call only in the browser. */
export function startTickLoop(): () => void {
	if (typeof window === 'undefined') {
		return () => {};
	}
	if (handle !== undefined) {
		clearInterval(handle);
	}
	handle = setInterval(() => {
		const l = get(love);
		const income = moneyPerTick(l);
		const decay = loveDecayForTickMs(TICK_INTERVAL_MS);
		const nextLove = clampLove(l - decay);
		money.update((m) => m + income);
		love.set(nextLove);
	}, TICK_INTERVAL_MS);
	return () => {
		if (handle !== undefined) {
			clearInterval(handle);
			handle = undefined;
		}
	};
}
