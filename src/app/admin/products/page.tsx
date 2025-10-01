import Dashboard from "@/components/admin/products/Dashboard";
import { cookies } from "next/headers";
import { Product, ProductAttribute, ProductPreview } from "@/types/admin-products";

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
    shields: "api/admin/products/shields/get",
    volumes: "api/admin/products/volumes/get",
    isotopes: "api/admin/products/isotopes/get",
    accessories: "api/admin/products/accessories/get",
    usages: "api/admin/products/usages/get",
    customizationOptions: "api/admin/products/customization-options/get",
    products: "api/admin/products/get",
    filters: "api/admin/products/filters/get",
    popularProducts: "api/admin/products/popular/get",
  };

  const keys = Object.keys(routes) as (keyof AdminProductsData)[];

  const data = {} as AdminProductsData;

  await Promise.all(
    keys.map(async (key) => {
      const res = await fetchByRoute(routes[key]);
      if (!res.ok) {
        data[key] = { data: [], error: `Failed to load ${key} (${res.status})` };
        return;
      }
      const jsonData = await res.json();
      data[key] = { data: jsonData };
    })
  );

  return (
    <main className="p-5 w-full font-[Inter] bg-[#111110]">
      <Dashboard data={data}/>
    </main>
  );
}

function fetchByRoute(route: string): Promise<Response> {
  return fetch(`${process.env.DOMAIN_NAME}/${route}`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });
}
