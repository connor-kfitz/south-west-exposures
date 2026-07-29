import Dashboard from "@/components/admin/products/Dashboard";
import { cookies } from "next/headers";
import { Product, ProductAttribute, ProductPreview } from "@/types/admin-products";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface DataWithError<T> {
  data: T;
  error?: string;
}

export interface AdminProductsData {
  shields: DataWithError<ProductAttribute[]>;
  volumes: DataWithError<ProductAttribute[]>;
  isotopes: DataWithError<ProductAttribute[]>;
  accessories: DataWithError<ProductAttribute[]>;
  usages: DataWithError<ProductAttribute[]>;
  customizationOptions: DataWithError<ProductAttribute[]>;
  products: DataWithError<Product[]>;
  filters: DataWithError<ProductAttribute[]>;
  popularProducts: DataWithError<ProductPreview[]>;
}

export default async function AdminProductsPage() {
  const routes = {
    shields: "api/products/shields",
    volumes: "api/products/volumes",
    isotopes: "api/products/isotopes",
    accessories: "api/products/accessories",
    usages: "api/products/usages",
    customizationOptions: "api/products/customization-options",
    products: "api/products",
    filters: "api/products/filters",
    popularProducts: "api/products/popular",
  }

  const keys = Object.keys(routes) as (keyof AdminProductsData)[];

  const data = {} as AdminProductsData;

  const cookieStore = await cookies();

  await Promise.all(
    keys.map(async (key) => {
      const res = await fetchByRoute(routes[key], cookieStore);
      if (!res.ok) {
        data[key] = { data: [], error: `Failed to load ${key} (${res.status})` }
        return;
      }
      const jsonData = await res.json();
      data[key] = { data: jsonData }
    })
  );

  return (
    <main className="p-5 w-full font-[Inter] bg-[#111110]">
      <Dashboard data={data}/>
    </main>
  );
}

async function fetchByRoute(route: string, cookieStore: ReadonlyRequestCookies): Promise<Response> {
  return fetch(`${process.env.DOMAIN_NAME}/${route}`, {
    headers: {
      Cookie: cookieStore.toString()
    },
    cache: "no-store"
  });
}
