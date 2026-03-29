import type shopData from './shop.json';
import type stringsData from './strings.json';

export type ShopCatalog = typeof shopData;
export type ShopItem = (typeof shopData.items)[number];

export type Strings = typeof stringsData;
