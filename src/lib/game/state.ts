import { writable, type Writable } from 'svelte/store';

import { LOVE } from './economy';

export const love: Writable<number> = writable(LOVE.INITIAL);
export const money: Writable<number> = writable(0);
