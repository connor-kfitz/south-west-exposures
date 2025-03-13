"use client";

import { useShields } from "@/hooks/useShields";
import { useVolumes } from "@/hooks/useVolumes";
import { useIsotopes } from "@/hooks/useIsotopes";
import { useAccessories } from "@/hooks/useAccessories";
import { useUsages } from "@/hooks/useUsages";
import AddAttribute from "@/components/admin/products/AddAttribute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Dashboard() {
  const { shields, loading: shieldsLoading, error: shieldsError, addError: shieldsAddError, postShield, deleteShield } = useShields();
  const { volumes, loading: volumesLoading, error: volumesError, addError: volumesAddError, postVolume, deleteVolume } = useVolumes();
  const { isotopes, loading: isotopesLoading, error: isotopesError, addError: isotopesAddError, postIsotope, deleteIsotope } = useIsotopes();
  const { accessories, loading: accessoriesLoading, error: accessoriesError, addError: accessoriesAddError, postAccessory, deleteAccessory } = useAccessories();
  const { usages, loading: usagesLoading, error: usagesError, addError: usagesAddError, postUsage, deleteUsage } = useUsages();

  if (shieldsLoading || volumesLoading || isotopesLoading || accessoriesLoading || usagesLoading) return <LoadingSpinner />;

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
        className="mr-5"
        data={volumes}
        error={volumesError}
        addError={volumesAddError}
        addAttribute={postVolume}
        deleteAttribute={deleteVolume}
      />
      <AddAttribute
        type="Isotopes"
        className="mr-5"
        data={isotopes}
        error={isotopesError}
        addError={isotopesAddError}
        addAttribute={postIsotope}
        deleteAttribute={deleteIsotope}
      />
      <AddAttribute
        type="Accessories"
        className="mr-5"
        data={accessories}
        error={accessoriesError}
        addError={accessoriesAddError}
        addAttribute={postAccessory}
        deleteAttribute={deleteAccessory}
      />
      <AddAttribute
        type="Usages"
        className="mr-5"
        data={usages}
        error={usagesError}
        addError={usagesAddError}
        addAttribute={postUsage}
        deleteAttribute={deleteUsage}
      />
    </section>
  );
}
