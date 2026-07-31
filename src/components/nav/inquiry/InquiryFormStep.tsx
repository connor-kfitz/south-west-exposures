"use client";

import Image from "next/image";
import Link from "next/link";
import TextInput from "@/components/shared/forms/TextInput";
import TextAreaInput from "@/components/shared/forms/TextAreaInput";
import PhoneNumberInput from "@/components/shared/forms/PhoneNumberInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useInquiryList } from "@/stores/useInquiryList";

const inquiryFormSchema = z.object({
  fullName: z.string().min(1, "Please enter your full name").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().length(10, "Please enter a valid phone number"),
  message: z.string().max(1000).optional()
});

export type InquiryFormData = z.infer<typeof inquiryFormSchema>;

interface InquiryFormStepProps {
  onBack: () => void;
  onSubmitted: () => void;
}

export default function InquiryFormStep({ onBack, onSubmitted }: InquiryFormStepProps) {
  const products = useInquiryList((state) => state.products);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = () => {
    onSubmitted();
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          const firstErrorField = Object.keys(errors)[0];
          const el = document.getElementById(firstErrorField);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus({ preventScroll: true });
          }
        })}
        className="flex h-full flex-col"
      >
        <div className="flex-1 overflow-y-auto px-6 pt-16 pb-12 sm:px-12">
          <SheetHeader className="gap-2 p-0 mb-8">
            <SheetTitle className="text-h4 leading-h4 font-semibold text-black">Inquiry list</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-start gap-2 mb-8">
            <p className="text-b7 font-semibold text-black">
              {products.length} product{products.length === 1 ? "" : "s"}
            </p>
            <ul className="flex w-full list-disc flex-col gap-1 pl-5 text-b7 text-gray-900">
              {products.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
          {Object.keys(form.formState.errors).length > 0 && (
            <div className="flex items-start gap-2 text-[#EF4444] p-6 bg-[#FEF2F2] mb-8 rounded-[8px]">
              <Image
                src="/images/contact/error.svg"
                alt="Error"
                width={24}
                height={24}
              />
              <p className="text-b6 leading-b6">
                Please review {Object.keys(form.formState.errors).length} error{Object.keys(form.formState.errors).length === 1 ? "" : "s"}.{" "}
                <Link
                  href={`#${Object.keys(form.formState.errors)[0]}`}
                  className="text-[#2563EB] underline rounded-[4px] p-[1px] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                >
                  Go to first error
                </Link>
              </p>
            </div>
          )}
          <div className="grid gap-6">
            <TextInput form={form} name="fullName" label="Full name"
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7 !text-gray-900"
              inputClass="px-4 py-3 text-gray-900 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
            />
            <TextInput form={form} name="email" label="Email address"
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7 !text-gray-900"
              inputClass="px-4 py-3 text-gray-900 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
            />
            <PhoneNumberInput form={form} name="phone" label={<PhoneLabel/>}
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7 !text-gray-900"
              inputClass="tracking-wide px-4 py-3 text-gray-900 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
            />
            <TextAreaInput form={form} name="message" label="Message (optional)"
              formItemClass="gap-1"
              formLabelClass="text-b7 leading-b7 !text-gray-900"
              areaClass="px-4 py-3 text-gray-900 border border-gray-500 rounded-[8px] min-h-[168px] max-h-[168px] resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
              maxChars={1000}
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-gray-300 px-6 py-4 sm:px-12">
          <button
            type="button"
            onClick={onBack}
            className="text-b6 font-medium text-blue-600 rounded-[4px] cursor-pointer hover:text-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            Go back
          </button>
          <Button type="submit" variant="primary" size="primaryDefault" className="w-[200px]" disabled={form.formState.isSubmitting}>
            Submit inquiry
          </Button>
        </div>
      </form>
    </Form>
  );
}

function PhoneLabel() {
  return (
    <span className="inline-flex items-center gap-1">
      Phone number
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Why we ask for your phone number"
          >
            <Image src="/images/shared/info.svg" alt="" width={16} height={16}/>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          We&apos;ll only use this to reach you faster about your inquiry.
        </TooltipContent>
      </Tooltip>
    </span>
  );
}
