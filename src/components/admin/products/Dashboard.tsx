"use client";

import { useShields } from "@/hooks/useShields";
import { useVolumes } from "@/hooks/useVolumes";
import AddAttribute from "@/components/admin/products/AddAttribute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Dashboard() {

  const { shields, loading: shieldsLoading, error: shieldsError, addError: shieldsAddError, postShield, deleteShield } = useShields();
  const { volumes, loading: volumesLoading, error: volumesError, addError: volumesAddError, postVolume, deleteVolume } = useVolumes();

  if (shieldsLoading || volumesLoading) return <LoadingSpinner />
  
  return (
    <section className="flex">
      <AddAttribute
        type="Shields"
        className="mr-5"
        data={shields}
        error={shieldsError}
        addError={shieldsAddError}
        addAttribute={postShield}
        deleteAttribute={deleteShield}
      />
      <AddAttribute
        type="Volumes"
        data={volumes}
        error={volumesError}
        addError={volumesAddError}
        addAttribute={postVolume}
        deleteAttribute={deleteVolume}
      />
    </section>
  )
}
