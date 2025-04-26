'use client';

import { Breadcrumb } from '@/types/global';
import { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext<{
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (crumbs: Breadcrumb[]) => void;
}>({
  breadcrumbs: [],
  setBreadcrumbs: () => { },
});

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbs() {
  return useContext(BreadcrumbContext);
}
