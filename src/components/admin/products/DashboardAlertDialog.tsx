"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DashboardAlert } from "@/types/admin";
import { Product } from "@/types/admin-products";
import { useState } from "react";

interface DashboardAlertDialogProps {
  alertDialog: DashboardAlert;
  setAlertDialog: React.Dispatch<React.SetStateAction<DashboardAlert>>;
  setEditProduct: (product: Product | null) => void;
}

export default function DashboardAlertDialog({ alertDialog, setAlertDialog, setEditProduct }: DashboardAlertDialogProps) {

  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  async function deleteItem() {
    if (!alertDialog.onConfirm || !alertDialog.deleteId || loadingDelete) return;
    setLoadingDelete(true);
    await alertDialog.onConfirm(alertDialog.deleteId);
    setLoadingDelete(false);
    setAlertDialog(prev => ({ ...prev, open: false }));
    setEditProduct(null);
  }

  return (
    <AlertDialog open={alertDialog.open}>
      <AlertDialogContent className="max-w-[700px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>{alertDialog.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          {alertDialog.deleteId ?
            <>
              <AlertDialogCancel
                style={{ boxShadow: "none", outline: "none", transition: "none" }}
                className="focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none text-white rounded-full"
                onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="w-[90px] flex justify-center items-center text-white" onClick={() => deleteItem()}>
                {loadingDelete ? <LoadingSpinner/> : "Continue"}
              </AlertDialogAction>
            </>
          :
            <AlertDialogAction onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}>Continue</AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
