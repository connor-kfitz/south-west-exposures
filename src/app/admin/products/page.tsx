"use client";
import AddAttribute from "@/components/admin/products/AddAttribute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useShields } from "@/hooks/useShields";

export default function AdminProductsPage() {

  const { shields, loading: shieldsLoading, error: shieldsError, addError: shieldsAddError, postShield, deleteShield } = useShields();

  if (shieldsLoading) return <LoadingSpinner/>

  return (
    <main className="p-5 w-full font-[Inter]">
      <AddAttribute 
        header="Shields"
        data={shields}
        error={shieldsError}
        addError={shieldsAddError}
        addAttribute={postShield}
        deleteAttribute={deleteShield}
      />
    </main>
  )
}
