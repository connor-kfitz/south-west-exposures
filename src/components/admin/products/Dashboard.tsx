"use client";

import { useShields } from "@/hooks/useShields";
import { useVolumes } from "@/hooks/useVolumes";
import { useIsotopes } from "@/hooks/useIsotopes";
import { useAccessories } from "@/hooks/useAccessories";
import { useUsages } from "@/hooks/useUsages";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { Product } from "@/types/admin-products";
import { DashboardAlert } from "@/types/admin";
import { useCustomizationOptions } from "@/hooks/useCustomizationOptions";
import { usePopularProducts } from "@/hooks/usePopularProducts";
import AddAttribute from "@/components/admin/products/AddAttribute";
import AddProduct from "./AddProduct";
import Products from "./Products";
import AlertDialog from "./DashboardAlertDialog";
import Header from "./Header";
import PopularProducts from "./PopularProducts";
import { AdminProductsData } from "@/app/admin/products/page";

interface DashboardProps {
  data: AdminProductsData;
}

export default function Dashboard({ data }: DashboardProps) {

  const { addError: shieldsAddError, postShield, deleteShield } = useShields();
  const { addError: volumesAddError, postVolume, deleteVolume } = useVolumes();
  const { addError: isotopesAddError, postIsotope, deleteIsotope } = useIsotopes();
  const { addError: accessoriesAddError, postAccessory, deleteAccessory } = useAccessories();
  const { addError: usagesAddError, postUsage, deleteUsage } = useUsages();
  const { addError: customizationOptionsAddError, postCustomizationOption, deleteCustomizationOption } = useCustomizationOptions();
  const { deleteProduct } = useProducts();
  const { postPopularProducts } = usePopularProducts();

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [alertDialog, setAlertDialog] = useState<DashboardAlert>({ title: "", description: "", open: false });
  
  return (
    <>
      <Header page="Products"/>
      <section className="flex flex-col gap-5 2xl:flex-row">
        <section className="flex-1">
          <section>
            <Products
              products={data.products.data}
              setEditProduct={setEditProduct}
              deleteProduct={deleteProduct}
              setAlertDialog={setAlertDialog}
            />
            <AddProduct
              shields={data.shields.data}
              volumes={data.volumes.data}
              isotopes={data.isotopes.data}
              accessories={data.accessories.data}
              customizationOptions={data.customizationOptions.data}
              usages={data.usages.data}
              products={data.products.data}
              filters={data.filters.data}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
            />
            <PopularProducts 
              popularProducts={data.popularProducts.data.map(product => ({
                id: product.id,
                images: product.images,
                name: product.name,
                shields: product.shields,
                volumes: product.volumes,
                isotopes: product.isotopes
              }))} 
              products={data.products.data.map(product => ({
                id: product.id,
                images: product.images,
                name: product.name,
                shields: product.shields,
                volumes: product.volumes,
                isotopes: product.isotopes
              }))}
              postPopularProducts={postPopularProducts}
            />
          </section>
        </section>
        <section className="basis-1/5 md:min-w-[400px]">
          <AddAttribute
            type="Shields"
            className="mb-5"
            data={data.shields.data}
            error={data.shields.error || ""}
            addError={shieldsAddError}
            addAttribute={postShield}
            deleteAttribute={deleteShield}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Volumes"
            className="mb-5"
            data={data.volumes.data}
            error={data.volumes.error || ""}
            addError={volumesAddError}
            addAttribute={postVolume}
            deleteAttribute={deleteVolume}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Isotopes"
            className="mb-5"
            data={data.isotopes.data}
            error={data.isotopes.error || ""}
            addError={isotopesAddError}
            addAttribute={postIsotope}
            deleteAttribute={deleteIsotope}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Accessories"
            className="mb-5"
            data={data.accessories.data}
            error={data.accessories.error || ""}
            addError={accessoriesAddError}
            addAttribute={postAccessory}
            deleteAttribute={deleteAccessory}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Usages"
            className="mb-5"
            data={data.usages.data}
            error={data.usages.error || ""}
            addError={usagesAddError}
            addAttribute={postUsage}
            deleteAttribute={deleteUsage}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Customization Options"
            data={data.customizationOptions.data}
            error={data.customizationOptions.error || ""}
            addError={customizationOptionsAddError}
            addAttribute={postCustomizationOption}
            deleteAttribute={deleteCustomizationOption}
            setAlertDialog={setAlertDialog}
          />
        </section>
      </section>
      <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialog} setEditProduct={setEditProduct}/>
    </>
  )
}
