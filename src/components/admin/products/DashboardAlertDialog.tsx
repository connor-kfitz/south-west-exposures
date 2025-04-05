import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DashboardAlert, Product } from "@/types/admin-products";

interface DashboardAlertDialogProps {
  alertDialog: DashboardAlert;
  setAlertDialog: React.Dispatch<React.SetStateAction<DashboardAlert>>;
  setEditProduct: (product: Product | null) => void;
}

export default function DashboardAlertDialog({ alertDialog, setAlertDialog, setEditProduct }: DashboardAlertDialogProps) {

  function deleteItem() {
    if (!alertDialog.onConfirm || !alertDialog.deleteId) return;
    alertDialog.onConfirm(alertDialog.deleteId);
    setAlertDialog(prev => ({ ...prev, open: false }));
    setEditProduct(null);
  }

  return (
    <AlertDialog open={alertDialog.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>{alertDialog.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {alertDialog.deleteId ?
            <>
              <AlertDialogCancel
                style={{ boxShadow: "none", outline: "none", transition: "none" }}
                className="focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none"
                onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteItem()}>Confirm</AlertDialogAction>
            </>
          :
            <AlertDialogAction onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}>Continue</AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
