"use client";

import { useShields } from "@/hooks/useShields";
import { useVolumes } from "@/hooks/useVolumes";
import { useIsotopes } from "@/hooks/useIsotopes";
import { useAccessories } from "@/hooks/useAccessories";
import { useUsages } from "@/hooks/useUsages";
import { useProducts } from "@/hooks/useProducts";
import { useFilters } from "@/hooks/useFilters";
import { useState } from "react";
import { DashboardAlert, Product } from "@/types/admin-products";
import AddAttribute from "@/components/admin/products/AddAttribute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import AddProduct from "./AddProduct";
import Products from "./Products";
import AlertDialog from "./DashboardAlertDialog";

export default function Dashboard() {
  const { shields, loading: shieldsLoading, error: shieldsError, addError: shieldsAddError, postShield, deleteShield } = useShields();
  const { volumes, loading: volumesLoading, error: volumesError, addError: volumesAddError, postVolume, deleteVolume } = useVolumes();
  const { isotopes, loading: isotopesLoading, error: isotopesError, addError: isotopesAddError, postIsotope, deleteIsotope } = useIsotopes();
  const { accessories, loading: accessoriesLoading, error: accessoriesError, addError: accessoriesAddError, postAccessory, deleteAccessory } = useAccessories();
  const { usages, loading: usagesLoading, error: usagesError, addError: usagesAddError, postUsage, deleteUsage } = useUsages();
  const { products, loading: loadingProducts, fetchProducts, deleteProduct } = useProducts();
  const { filters, loading: loadingFilters } = useFilters();

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [alertDialog, setAlertDialog] = useState<DashboardAlert>({title: "", description: "", open: false});

  if (shieldsLoading || volumesLoading || isotopesLoading || accessoriesLoading || usagesLoading || loadingProducts || loadingFilters) 
    return <LoadingSpinner/>;

  return (
    <>
      <section className="flex gap-5">
        <section className="flex-1">
          <section>
            <Products
              products={products}
              setEditProduct={setEditProduct}
              deleteProduct={deleteProduct}
            />
            <AddProduct
              shields={shields}
              volumes={volumes}
              isotopes={isotopes}
              accessories={accessories}
              usages={usages}
              products={products}
              filters={filters}
              editProduct={editProduct}
              fetchProducts={fetchProducts}
              setEditProduct={setEditProduct}
            />
          </section>
        </section>
        <section className="basis-1/5 min-w-[400px]">
          <AddAttribute
            type="Shields"
            className="mb-5"
            data={shields}
            error={shieldsError}
            addError={shieldsAddError}
            addAttribute={postShield}
            deleteAttribute={deleteShield}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Volumes"
            className="mb-5"
            data={volumes}
            error={volumesError}
            addError={volumesAddError}
            addAttribute={postVolume}
            deleteAttribute={deleteVolume}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Isotopes"
            className="mb-5"
            data={isotopes}
            error={isotopesError}
            addError={isotopesAddError}
            addAttribute={postIsotope}
            deleteAttribute={deleteIsotope}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Accessories"
            className="mb-5"
            data={accessories}
            error={accessoriesError}
            addError={accessoriesAddError}
            addAttribute={postAccessory}
            deleteAttribute={deleteAccessory}
            setAlertDialog={setAlertDialog}
          />
          <AddAttribute
            type="Usages"
            data={usages}
            error={usagesError}
            addError={usagesAddError}
            addAttribute={postUsage}
            deleteAttribute={deleteUsage}
            setAlertDialog={setAlertDialog}
          />
        </section>
      </section>
      <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialog}/>
    </>
  );
}
