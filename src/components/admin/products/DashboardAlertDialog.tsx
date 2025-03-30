import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DashboardAlert } from "@/types/admin-products";

interface DashboardAlertDialogProps {
  alertDialog: DashboardAlert;
  setAlertDialog: React.Dispatch<React.SetStateAction<DashboardAlert>>;
}

export default function DashboardAlertDialog({ alertDialog, setAlertDialog }: DashboardAlertDialogProps) {
  return (
    <AlertDialog open={alertDialog.open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>{alertDialog.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setAlertDialog(prev => ({...prev, open: false}))}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
