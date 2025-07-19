"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneNumberInput from "@/components/shared/forms/PhoneNumberInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import TextInput from "@/components/shared/forms/TextInput";
import z from "zod";

const contactFormSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().length(10, "Please enter a valid phone number"),
  message: z.string().min(1, "Please enter a message").max(1000)
})

export type InquiryFormData = z.infer<typeof contactFormSchema>

interface InquiryDialogProps {
  productName: string;
}

export default function InquiryDialog({productName}: InquiryDialogProps) {
  const form = useForm<InquiryFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    }
  })

  const onSubmit = async (data: InquiryFormData) => {
    // const success = sendEmail(data.firstName + " " + data.lastName, data.email, data.phone, data.message, data.website)
    // if (!success) return;

    // form.reset();
    // setAlertDialog((prev) => ({ ...prev, open: true }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="primaryDefault">Inquire about this product</Button>
      </DialogTrigger>
      <DialogContent className="font-main max-w-[593px] bg-white gap-[24px] p-[64px] rounded-[32px]">
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
            <div className="flex gap-4 mt-6">
              <Button type="submit" variant="primary" size="primaryDefault" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Submit inquiry"}
              </Button>
              <Button type="submit" variant="primaryGhost" size="primaryGhostDefault" className="" disabled={form.formState.isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            {/* <Button variant="outline">Cancel</Button> */}
          </DialogClose>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
