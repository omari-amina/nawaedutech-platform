// src/hooks/useCatalog.ts — reactive merged catalog for storefront
import { useSyncExternalStore } from 'react';
import {
  catalogRevision,
  getAdminProducts,
  getCatalogBrand,
  subscribeCatalog,
  type AdminProduct,
} from '../lib/catalogStore';
import type { ProductItem } from '../data/brandSite';

function subscribe(fn: () => void) {
  return subscribeCatalog(fn);
}
function snapshot(): number {
  return catalogRevision();
}

export function useBrandProducts(): ProductItem[] {
  useSyncExternalStore(subscribe, snapshot, snapshot);
  return getCatalogBrand();
}

export function useAdminProducts(): AdminProduct[] {
  useSyncExternalStore(subscribe, snapshot, snapshot);
  return getAdminProducts();
}
