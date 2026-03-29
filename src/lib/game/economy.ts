/**
 * Tunable economy: love bounds, decay, tick money from love, pet deltas.
 * Keep tuning here — avoid scattering multipliers in components.
 */

export const TICK_INTERVAL_MS = 500;

export const LOVE = {
	MIN: 0,
	MAX: 100,
	INITIAL: 52,
	/** Gentle dip over time (per second). */
	DECAY_PER_SECOND: 0.32,
	/** Added when the player pets (one click). */
	PET_DELTA: 7
} as const;

export const MONEY = {
	/** Per tick: BASE_PER_TICK * (currentLove / LOVE_MAX). */
	BASE_PER_TICK: 0.28,
	/** Extra cash on each pet (Love × action → money). */
	PET_BONUS: 0.18
} as const;

/** Love bands for mood copy from JSON (exclusive upper bounds). */
export const LOVE_BAND_THRESHOLDS = {
	low: 34,
	mid: 67
} as const;

export type LoveBand = 'low' | 'mid' | 'high';

export function loveBand(love: number): LoveBand {
	if (love < LOVE_BAND_THRESHOLDS.low) return 'low';
	if (love < LOVE_BAND_THRESHOLDS.mid) return 'mid';
	return 'high';
}

export function clampLove(n: number): number {
	return Math.min(LOVE.MAX, Math.max(LOVE.MIN, n));
}

export function loveDecayForTickMs(tickMs: number): number {
	return LOVE.DECAY_PER_SECOND * (tickMs / 1000);
}

/** Money earned each tick from passive accrual (scales with current love). */
export function moneyPerTick(loveValue: number): number {
	const t = loveValue / LOVE.MAX;
	return MONEY.BASE_PER_TICK * t;
}
