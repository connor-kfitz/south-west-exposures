"use client";

import { ConfirmationAlert } from "@/types/global";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect } from "react";

interface ConfirmationDialogProps {
  alertDialog: ConfirmationAlert;
  setAlertDialog: React.Dispatch<React.SetStateAction<ConfirmationAlert>>;
}

export default function ConfirmationDialog({alertDialog, setAlertDialog}: ConfirmationDialogProps) {

  const isMediumBreakpoint = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAlertDialog(prev => ({ ...prev, open: false }));
      }
    };

    if (alertDialog.open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [alertDialog.open, setAlertDialog]);

  if (isMediumBreakpoint) { 
    return (
      <AlertDialog open={alertDialog.open}>
        <AlertDialogContent className="font-main bg-white rounded-[24px] p-[48px] max-w-[564px] gap-6 border-0 shadow-2xl">
          <button className="flex justify-center items-center absolute w-[44px] h-[44px] top-[8px] right-[8px] cursor-pointer" onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}>
            <Image
              src="/images/shared/alert-close.svg"
              alt="Close"
              width={20}
              height={20}
            />
          </button>
          <AlertDialogHeader className="gap-4 max-w-[436px]">
            <div className="flex items-start">
              <div className="p-[4.5px] mr-2">
                <div className="w-[39px] h-[39px] bg-green-500 rounded-full flex justify-center items-center">
                  <Image src="/images/shared/checkmark.svg" alt="Checkmark" width={27} height={27}/>
                </div>
              </div>
              <AlertDialogTitle className="text-h2">{alertDialog.title}</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-b6 text-gray-600">{alertDialog.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="primary" size="primaryDefault" className="mr-auto" onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ) 
  } else { 
    return (
      <Drawer open={alertDialog.open} onClose={() => setAlertDialog(prev => ({ ...prev, open: false }))}>
        <DrawerContent className="bg-white min-h-[336px] border-0 px-[24px]">
          <button className="flex justify-center items-center absolute w-[44px] h-[44px] top-[8px] right-[8px] cursor-pointer" onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}>
            <Image
              src="/images/shared/alert-close.svg"
              alt="Close"
              width={20}
              height={20}
            />
          </button>
          <DrawerHeader className="flex flex-col justify-center px-0 pt-[32px]">
            <div className="flex justify-center items-center p-[4.5px] mb-2">
              <div className="w-[39px] h-[39px] bg-green-500 rounded-full flex justify-center items-center">
                <Image src="/images/shared/checkmark.svg" alt="Checkmark" width={27} height={27} />
              </div>
            </div>
            <DrawerTitle className="text-h2 mb-4">{alertDialog.title}</DrawerTitle>
            <DrawerDescription className="text-b6 text-gray-600">{alertDialog.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pb-[32px]">
            <Button variant="primary" size="primaryDefault" className="w-full" onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
}
