import { InquiryListProduct } from '@/types/inquiry';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type InquiryListStore = {
  products: InquiryListProduct[];
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  addProduct: (product: InquiryListProduct) => void;
  removeProduct: (id: string) => void;
}

const initialState: InquiryListProduct[] = [];

export const useInquiryList = create<InquiryListStore>()(
  persist(
    (set) => ({
      products: initialState,
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      addProduct: (product) => set((state) => (
        state.products.some((p) => p.id === product.id)
          ? state
          : { products: [...state.products, product] }
      )),
      removeProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      }))
    }),
    {
      name: 'swe-inquiry-list',
      storage: createJSONStorage(() => localStorage),
      version: 0,
      skipHydration: true,
      partialize: (state) => ({ products: state.products }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true)
    }
  )
);
