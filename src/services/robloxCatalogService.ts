import { RobloxCatalogItem } from '../types';
import { OFFICIAL_ROBLOX_CATALOG_ITEMS } from '../data/robloxCatalogData';

export interface CatalogQueryParams {
  category: string;
  keyword?: string;
  sort?: 'popular' | 'price-asc' | 'price-desc' | 'newest';
  cursor?: string | null;
  page?: number;
  limit?: number;
}

export interface CatalogQueryResult {
  items: RobloxCatalogItem[];
  totalCount: number;
  nextPageCursor: string | null;
  previousPageCursor: string | null;
  page: number;
  totalPages: number;
  isLiveApi: boolean;
  message?: string;
}

// In-memory thumbnail cache to avoid re-requesting Roblox CDN
const thumbnailCache = new Map<string, string>();

/**
 * Fetch thumbnail images for asset and bundle IDs from the official Roblox Thumbnails API
 */
export async function fetchRobloxThumbnails(
  assetIds: number[],
  bundleIds: number[]
): Promise<Map<string, string>> {
  const result = new Map<string, string>();

  // Use cached where available
  const missingAssetIds = assetIds.filter(id => !thumbnailCache.has(`asset_${id}`));
  const missingBundleIds = bundleIds.filter(id => !thumbnailCache.has(`bundle_${id}`));

  try {
    // 1. Fetch asset thumbnails in batches
    if (missingAssetIds.length > 0) {
      const assetBatches = [];
      for (let i = 0; i < missingAssetIds.length; i += 30) {
        assetBatches.push(missingAssetIds.slice(i, i + 30));
      }

      for (const batch of assetBatches) {
        const url = `/api/roblox/thumbnails/v1/assets?assetIds=${batch.join(',')}&returnPolicy=PlaceHolder&size=420x420&format=Png&isCircular=false`;
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            const json = await resp.json();
            if (json.data && Array.isArray(json.data)) {
              for (const item of json.data) {
                if (item.imageUrl) {
                  thumbnailCache.set(`asset_${item.targetId}`, item.imageUrl);
                }
              }
            }
          }
        } catch {
          // Ignore individual batch errors
        }
      }
    }

    // 2. Fetch bundle thumbnails in batches
    if (missingBundleIds.length > 0) {
      const bundleBatches = [];
      for (let i = 0; i < missingBundleIds.length; i += 30) {
        bundleBatches.push(missingBundleIds.slice(i, i + 30));
      }

      for (const batch of bundleBatches) {
        const url = `/api/roblox/thumbnails/v1/bundles/thumbnails?bundleIds=${batch.join(',')}&size=420x420&format=Png&isCircular=false`;
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            const json = await resp.json();
            if (json.data && Array.isArray(json.data)) {
              for (const item of json.data) {
                if (item.imageUrl) {
                  thumbnailCache.set(`bundle_${item.targetId}`, item.imageUrl);
                }
              }
            }
          }
        } catch {
          // Ignore individual batch errors
        }
      }
    }
  } catch (e) {
    console.warn('Could not fetch live thumbnails:', e);
  }

  // Populate from cache
  assetIds.forEach(id => {
    const cached = thumbnailCache.get(`asset_${id}`);
    if (cached) result.set(`asset_${id}`, cached);
  });
  bundleIds.forEach(id => {
    const cached = thumbnailCache.get(`bundle_${id}`);
    if (cached) result.set(`bundle_${id}`, cached);
  });

  return result;
}

/**
 * Maps category IDs to official Roblox Catalog API query parameters
 */
function getRobloxApiCategoryParams(category: string): { category?: string; subcategory?: string; salesTypeFilter?: string } {
  switch (category) {
    case 'bundles':
      return { category: 'BodyParts', subcategory: 'Bundles' };
    case 'hats':
      return { category: 'Accessories', subcategory: 'HatAccessories' };
    case 'hair':
      return { category: 'Accessories', subcategory: 'HairAccessories' };
    case 'faces':
      return { category: 'BodyParts', subcategory: 'Faces' };
    case 'clothing':
      return { category: 'Clothing' };
    case 'accessories':
      return { category: 'Accessories' };
    case 'limiteds':
      return { category: 'Collectibles' };
    case 'outfits':
      return { category: 'Clothing' };
    default:
      return { category: 'All' };
  }
}

/**
 * Searches the Roblox Marketplace Catalog
 * Queries https://catalog.roblox.com/v1/search/items/details
 * Seamlessly merges live results and authentic official catalog database.
 */
export async function searchRobloxCatalog(params: CatalogQueryParams): Promise<CatalogQueryResult> {
  const {
    category = 'all',
    keyword = '',
    sort = 'popular',
    cursor = null,
    page = 1,
    limit = 12
  } = params;

  let liveItems: RobloxCatalogItem[] | null = null;
  let liveNextCursor: string | null = null;
  let livePrevCursor: string | null = null;

  // Attempt live request to official Roblox Catalog API endpoint
  try {
    const apiParams = getRobloxApiCategoryParams(category);
    const queryParts = [
      `limit=30`,
      apiParams.category ? `category=${encodeURIComponent(apiParams.category)}` : 'category=All'
    ];

    if (apiParams.subcategory) {
      queryParts.push(`subcategory=${encodeURIComponent(apiParams.subcategory)}`);
    }
    if (keyword.trim()) {
      queryParts.push(`keyword=${encodeURIComponent(keyword.trim())}`);
    }
    if (cursor) {
      queryParts.push(`cursor=${encodeURIComponent(cursor)}`);
    }

    const apiUrl = `/api/roblox/catalog?${queryParts.join('&')}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        liveNextCursor = data.nextPageCursor || null;
        livePrevCursor = data.previousPageCursor || null;

        const assetIds: number[] = [];
        const bundleIds: number[] = [];

        data.data.forEach((raw: any) => {
          if (raw.itemType === 'Bundle' || raw.bundleType !== undefined) {
            bundleIds.push(raw.id);
          } else {
            assetIds.push(raw.id);
          }
        });

        // Resolve original thumbnails
        const thumbMap = await fetchRobloxThumbnails(assetIds, bundleIds);

        liveItems = data.data.map((raw: any): RobloxCatalogItem => {
          const isBundle = raw.itemType === 'Bundle' || raw.bundleType !== undefined;
          const thumbKey = isBundle ? `bundle_${raw.id}` : `asset_${raw.id}`;
          const thumb = thumbMap.get(thumbKey) ||
            OFFICIAL_ROBLOX_CATALOG_ITEMS.find(it => it.id === raw.id)?.thumbnailUrl ||
            'https://tr.rbxcdn.com/180DAY-c977137e24824df9a31f4837a97fcbda/420/420/Hat/Png/noFilter';

          const itemType = isBundle ? 'Bundle' : 'Asset';
          const robloxUrl = isBundle
            ? `https://www.roblox.com/bundles/${raw.id}/${encodeURIComponent(raw.name.replace(/\s+/g, '-'))}`
            : `https://www.roblox.com/catalog/${raw.id}/${encodeURIComponent(raw.name.replace(/\s+/g, '-'))}`;

          return {
            id: raw.id,
            name: raw.name || 'Roblox Item',
            description: raw.description || 'Official Roblox Marketplace asset.',
            itemType,
            assetType: raw.assetType,
            bundleType: raw.bundleType,
            creatorName: raw.creatorName || 'Roblox',
            creatorHasVerifiedBadge: raw.creatorHasVerifiedBadge ?? true,
            price: raw.price ?? raw.lowestPrice ?? raw.lowestResalePrice ?? 0,
            lowestPrice: raw.lowestPrice,
            lowestResalePrice: raw.lowestResalePrice,
            priceStatus: raw.priceStatus,
            favoriteCount: raw.favoriteCount || 1000,
            thumbnailUrl: thumb,
            category: (category === 'all' ? (isBundle ? 'bundles' : 'hats') : category) as any,
            categoryLabel: category.toUpperCase(),
            isLimited: raw.itemRestrictions?.includes('Limited') || raw.lowestResalePrice !== undefined,
            robloxUrl
          };
        });
      }
    }
  } catch {
    // If live API is rate-limited (429) or offline, fallback immediately to official catalog dataset
    liveItems = null;
  }

  // Use live results if valid and matching query, otherwise fallback to the comprehensive official dataset
  let sourceItems: RobloxCatalogItem[] = OFFICIAL_ROBLOX_CATALOG_ITEMS;
  let isLive = false;

  if (liveItems && liveItems.length > 0) {
    sourceItems = liveItems;
    isLive = true;
  }

  // Filter by category
  let filtered = sourceItems;
  if (category !== 'all') {
    filtered = filtered.filter(item => item.category === category);
  }

  // Filter by search keyword
  if (keyword.trim()) {
    const q = keyword.toLowerCase().trim();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.creatorName.toLowerCase().includes(q)
    );
  }

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      case 'popular':
      default:
        return (b.favoriteCount || 0) - (a.favoriteCount || 0);
    }
  });

  // Calculate pagination
  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * limit;
  const pageItems = sorted.slice(startIndex, startIndex + limit);

  return {
    items: pageItems,
    totalCount,
    nextPageCursor: liveNextCursor,
    previousPageCursor: livePrevCursor,
    page: currentPage,
    totalPages,
    isLiveApi: isLive,
    message: totalCount === 0 
      ? `No avatar cosmetics found matching "${keyword}" in ${category === 'all' ? 'All Items' : category}.`
      : undefined
  };
}
