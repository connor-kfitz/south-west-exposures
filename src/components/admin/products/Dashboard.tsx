"use client";

import { useShields } from "@/hooks/useShields";
import { useVolumes } from "@/hooks/useVolumes";
import { useIsotopes } from "@/hooks/useIsotopes";
import AddAttribute from "@/components/admin/products/AddAttribute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Dashboard() {
  const { shields, loading: shieldsLoading, error: shieldsError, addError: shieldsAddError, postShield, deleteShield } = useShields();
  const { volumes, loading: volumesLoading, error: volumesError, addError: volumesAddError, postVolume, deleteVolume } = useVolumes();
  const { isotopes, loading: isotopesLoading, error: isotopesError, addError: isotopesAddError, postIsotope, deleteIsotope } = useIsotopes();

  if (shieldsLoading || volumesLoading || isotopesLoading) return <LoadingSpinner />;

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
        data={isotopes}
        error={isotopesError}
        addError={isotopesAddError}
        addAttribute={postIsotope}
        deleteAttribute={deleteIsotope}
      />
    </section>
  );
}