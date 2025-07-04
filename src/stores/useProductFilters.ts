import { Filter } from '@/types/product-list';
import { create } from 'zustand';

type FilterStore = {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
};

const initialState: Filter[] = [];

export const useProductFilters = create<FilterStore>((set) => ({
  filters: initialState,
  setFilters: (filters) => set(() => ({ filters }))
}));
