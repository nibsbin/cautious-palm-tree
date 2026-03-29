import { get } from 'svelte/store';

import { clampLove, LOVE, MONEY } from './economy';
import { love, money } from './state';

/** Primary interaction: bump love and money (client-only). */
export function pet(): void {
	const l = get(love);
	love.set(clampLove(l + LOVE.PET_DELTA));
	money.update((m) => m + MONEY.PET_BONUS);
}
