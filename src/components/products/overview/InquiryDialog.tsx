"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { ProductPreview } from "@/types/admin-products";
import PhoneNumberInput from "@/components/shared/forms/PhoneNumberInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import TextInput from "@/components/shared/forms/TextInput";
import z from "zod";
import Image from "next/image";
import ProductCard from "../ProductCard";

const contactFormSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional()
})

export type InquiryFormData = z.infer<typeof contactFormSchema>

interface InquiryDialogProps {
  productName: string;
  purchasedTogether?: ProductPreview[]; 
}

export default function InquiryDialog({productName, purchasedTogether}: InquiryDialogProps) {
  const form = useForm<InquiryFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    }
  })
  
  const [open, setOpen] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<"Form" | "Featured Products">("Form");

  useEffect(() => {
    if (open) return;

    setDialogState("Form");
    form.reset();
  },[open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="primaryDefault" onClick={() => setOpen(true)}>Inquire about this product</Button>
      </DialogTrigger>
      {open && (
        dialogState === "Form" ? (
          <InquiryContent form={form} productName={productName} setOpen={setOpen} setDialogState={setDialogState}/>
        ) : (
          <SubmittedContent purchasedTogether={purchasedTogether ?? []} setOpen={setOpen}/>
        )
      )}
    </Dialog>
  )
}

interface InquiryContentProps {
  form: ReturnType<typeof useForm<InquiryFormData>>;
  productName: string;
  setOpen: (open: boolean) => void;
  setDialogState: (state: "Form" | "Featured Products") => void;
}

function InquiryContent({ form, productName, setOpen, setDialogState }: InquiryContentProps) {

  const onSubmit = async (data: InquiryFormData) => {
    const success = sendEmail(data.fullName, data.email, data.phone, data.message)
    if (!success) return;

    form.reset();
    setDialogState("Featured Products");
  }

  return (
    <DialogContent className="font-main max-w-[calc(100%-2rem)] md:max-w-[593px] bg-white gap-[24px] px-6 sm:px-[64px] py-[64px] rounded-[32px] overflow-y-auto max-h-[calc(100vh-2rem)]">
      <button className="flex justify-center items-center absolute w-[44px] h-[44px] top-[16px] right-[16px] cursor-pointer" onClick={() => setOpen(false)}>
        <Image
          src="/images/shared/alert-close.svg"
          alt="Close"
          width={28}
          height={28}
        />
      </button>
      <DialogHeader className="gap-4">
        <DialogTitle className="text-h3">Inquire about {productName}</DialogTitle>
        <DialogDescription className="text-b6 text-grey-600">Have questions or want a customization? We typically respond within 1 to 2 business days.</DialogDescription>
      </DialogHeader>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <TextInput form={form} name="fullName" label="Full Name"
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7"
              inputClass="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
            />
            <TextInput form={form} name="email" label="Email Address"
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7"
              inputClass="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
            />
            <PhoneNumberInput form={form} name="phone" label="Phone Number"
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7"
              inputClass="tracking-wide px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
            />
            <TextAreaInput form={form} name="message" label="Message (optional)"
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7"
              areaClass="px-4 py-3 border border-gray-500 rounded-[8px] min-h-[168px] resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
              maxChars={1000}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <Button type="submit" variant="primary" size="primaryDefault" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending..." : "Submit inquiry"}
            </Button>
            <Button variant="primaryGhost" size="primaryGhostDefault" className="w-full sm:w-auto" onClick={() => setOpen(false)} disabled={form.formState.isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}

interface SubmittedContentProps {
  purchasedTogether: ProductPreview[]; 
  setOpen: (open: boolean) => void;
}

function SubmittedContent({ purchasedTogether, setOpen }: SubmittedContentProps) {

  return (
    <DialogContent className="font-main max-w-[calc(100%-2rem)] inquiryModalSize:max-w-[1003px] bg-white gap-[48px] px-6 sm:px-[64px] py-[64px] rounded-[32px] overflow-y-auto max-h-[calc(100vh-2rem)]">
      <DialogHeader className="block">
        <DialogTitle className="text-h2 mb-4">Product inquiry submitted!</DialogTitle>
        <DialogDescription className="text-b6 text-grey-600 mb-6">Thank you for contacting us. We’ll follow up within 1 to 2 business days.</DialogDescription>
        <Button variant="primaryGhost" size="primaryGhostDefault" onClick={() => setOpen(false)}>Continue browsing</Button>
      </DialogHeader>
      {purchasedTogether?.length > 0 && (
        <div>
          <h2 className="text-h4 text-grey-900 font-semibold mb-4 text-center sm:text-left">Frequently purchased together</h2>
          <div className="flex justify-center gap-4">
            {purchasedTogether.slice(0, 3).map((product, index) => (
              <ProductCard key={index} product={product} 
                className={`w-full max-w-[300px] mr-4
                  ${index === 1 ? " hidden sm:block" : ""}
                  ${index === 2 ? " hidden lg:block" : ""}
                `}
              />
            ))}
          </div>
        </div>
      )}
    </DialogContent>
  )
}
