"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ConfirmationAlert } from "@/types/global"
import Image from "next/image"
import Link from "next/link"
import TextInput from "../shared/forms/TextInput"
import TextAreaInput from "../shared/forms/TextAreaInput"
import PhoneNumberInput from "../shared/forms/PhoneNumberInput"

const contactFormSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name").max(50),
  lastName: z.string().min(1, "Please enter your last name").max(50),
  email: z.string().email("Please enter a valid email address"),
  website: z.string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
  phone: z.string().length(10, "Please enter a valid phone number"),
  message: z.string().min(1, "Please enter a message").max(1000)
})

export type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  className?: string
  setAlertDialog: React.Dispatch<React.SetStateAction<ConfirmationAlert>>;
}

export default function ContactForm({ className, setAlertDialog }: ContactFormProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      website: "",
      phone: "",
      message: "",
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    const success = sendEmail(data.firstName + " " + data.lastName, data.email, data.phone, data.message, data.website)
    if (!success) return;

    form.reset();
    setAlertDialog((prev) => ({ ...prev, open: true }));
  }

  async function sendEmail(name: string, email: string, phone: string, message: string, website?: string) {
    try {
      const body = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #444;">New Contact Form Submission</h2>

          <p><strong>Email:</strong> ${email}</p>
          ${website ? `<p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ""}
          <p><strong>Phone:</strong> ${phone}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `;

      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: body }),
      });

      if (!res.ok) {
        console.error('Email send failed with status:', res.status);
        return false;
      }

      const result = await res.json();
      return result.success ?? false;

    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className={`px-6 bg-white rounded-[24px] sm:px-[64px] ${className}`}>
        <h1 className="text-h2 leading-h2 font-semibold text-gray-900 mb-4">Send us a message</h1>
        <p className="text-b6 leading-b6 text-gray-600 mb-4">
          You can email us directly at&nbsp;
          <a className="text-gray-900 font-medium" href="mailto:info@swexposures.com">
            info@swexposures.com
          </a>
          , or use the form below to send a message.
        </p>
        <p className="text-b7 leading-b6 text-gray-600 mb-8">All fields are required unless marked optional.</p>

        {Object.keys(form.formState.errors).length > 0 && <div className="flex items-center gap-2 text-[#EF4444] p-6 bg-[#FEF2F2] mb-[32px] rounded rounded-[8px]">
          <Image
            src="/images/contact/error.svg"
            alt="Error"
            width={24}
            height={24}
          />
          <p className="text-b6 leading-b6">Please review {Object.keys(form.formState.errors).length} errors. <Link href={`#${Object.keys(form.formState.errors)[0]}`} className="text-[#2563EB] underline">Go to first error</Link></p>
        </div>}

        <div className="grid gap-6">
          <TextInput form={form} name="firstName" label="First Name" 
            formItemClass="gap-1"
            formLabelClass="text-b7 leading-b7"
            inputClass="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
          />
          <TextInput form={form} name="lastName" label="Last Name" 
            formItemClass="gap-1"
            formLabelClass="text-b7 leading-b7"
            inputClass="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
          />
          <TextInput form={form} name="email" label="Email Address" 
            formItemClass="gap-1"
            formLabelClass="text-b7 leading-b7"
            inputClass="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
          />
          <TextInput form={form} name="website" label={<WebsiteLabel/>} 
            formItemClass="gap-1"
            formLabelClass="text-b7 leading-b7"
            inputClass="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
          />
          <PhoneNumberInput form={form} name="phone" label="Phone Number"
            formItemClass="gap-1"
            formLabelClass="text-b7 leading-b7"
            inputClass="tracking-wide px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
          />
          <TextAreaInput form={form} name="message" label="Message"
            formItemClass="gap-1"
            formLabelClass="text-b7 leading-b7"
            areaClass="px-4 py-3 border border-gray-500 rounded-[8px] min-h-[168px] resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
            maxChars={1000}
          />
        </div>
        <Button type="submit" variant="primary" size="primaryDefault" className="mt-6" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}

function WebsiteLabel() {
  return (
    <div className="text-start">
      Website (optional)
      <br/>
      <span className="font-normal text-gray-600">E.g. website.com</span>
    </div>
  )
}
