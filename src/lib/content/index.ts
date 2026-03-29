import shop from './shop.json';
import strings from './strings.json';

import type { ShopCatalog, Strings } from './types';

export const content: { strings: Strings; shop: ShopCatalog } = {
	strings: strings as Strings,
	shop: shop as ShopCatalog
};

export { shop, strings };
export type { ShopCatalog, ShopItem, Strings } from './types';
