"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  message: z.string().min(1, "Message is required").max(1000),
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className }: ContactFormProps) {
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
    console.log("Form submitted:", data);
  }

  const getFormattedPosition = (rawDigits: string, caretAt: number) => {
    const format = ["(", "_", "_", "_", ")", " ", "_", "_", "_", "-", "_", "_", "_", "_"]
    let digitIndex = 0;
    for (let i = 0; i < format.length; i++) {
      if (format[i] === "_") {
        if (digitIndex === caretAt) return i;
        digitIndex++;
      }
    }
    return format.length;
  }

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10)
    const format = ["(", "_", "_", "_", ")", " ", "_", "_", "_", "-", "_", "_", "_", "_"]
    let digitIndex = 0;
    for (let i = 0; i < format.length; i++) {
      if (format[i] === "_" && digitIndex < digits.length) {
        format[i] = digits[digitIndex++];
      }
    }
    return format.join("");
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`px-6 bg-white rounded-[24px] sm:px-[64px] ${className}`}>
        <h1 className="text-h2 leading-h2 font-semibold text-gray-900 mb-4">Send us a message</h1>
        <p className="text-b6 leading-b6 text-gray-600 mb-4">
          You can email us directly at&nbsp;
          <a className="text-gray-900 font-medium" href="mailto:info@swexposures.com">
            info@swexposures.com
          </a>
          , or use the form below to send a message.
        </p>
        <p className="text-b7 leading-b6 text-gray-600 mb-8">All fields are required unless marked optional.</p>

        <div className="flex items-center gap-2 text-[#EF4444] p-6 bg-[#FEF2F2] mb-[32px] rounded rounded-[8px]">
          <Image
            src="/images/contact/error.svg"
            alt="Error"
            width={24}
            height={24}
          />
          <p className="text-b6 leading-b6">Please review 2 errors. <Link href="#" className="text-[#2563EB] underline">Go to first error</Link></p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-b7 leading-b7">First Name</FormLabel>
                <FormControl>
                  <Input {...field} className="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-b7 leading-b7">Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-b7 leading-b7">Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-b7 leading-b7">Website (optional)</FormLabel>
                <FormControl>
                  <Input {...field} className="px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-b7 leading-b7">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    ref={inputRef}
                    inputMode="numeric"
                    value={formatPhoneNumber(field.value || "")}
                    onChange={(e) => {
                      const input = e.target
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 10)
                      const nextLength = raw.length

                      field.onChange(raw)

                      requestAnimationFrame(() => {
                        const caretPos = getFormattedPosition(raw, nextLength)
                        input.setSelectionRange(caretPos, caretPos)
                      })
                    }}
                    onClick={(e) => {
                      const input = e.currentTarget
                      const raw = (field.value || "").replace(/\D/g, "")
                      const caretPos = getFormattedPosition(raw, raw.length)
                      input.setSelectionRange(caretPos, caretPos)
                    }}

                    onFocus={(e) => {
                      const input = e.currentTarget
                      const raw = (field.value || "").replace(/\D/g, "")
                      const caretPos = getFormattedPosition(raw, raw.length)
                      input.setSelectionRange(caretPos, caretPos)
                    }}
                    onKeyDown={(e) => {
                      const key = e.key
                      const raw = field.value.replace(/\D/g, "")

                      if (key === "Backspace") {
                        const caretPos = getFormattedPosition(raw, raw.length)
                        if (caretPos === 1) return;

                        e.preventDefault()
                        field.onChange(raw.slice(0, -1))

                        requestAnimationFrame(() => {
                          const caretPos = getFormattedPosition(raw, raw.length - 1)
                          inputRef.current?.setSelectionRange(caretPos, caretPos)
                        })
                      }
                    }}
                    placeholder="(___)___-____"
                    className="tracking-wide px-4 py-3 border border-gray-500 rounded-[8px] h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              const charsLeft = 1000 - (field.value?.length || 0)

              return (
                <FormItem className="gap-1">
                  <FormLabel className="text-b7 leading-b7">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      maxLength={1000}
                      className="px-4 py-3 border border-gray-500 rounded-[8px] min-h-[168px] resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                    />
                  </FormControl>
                  <div className="text-b7 leading-b7 text-gray-900">{charsLeft} characters left</div>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>

        <Button type="submit" variant="primary" size="primaryDefault" className="mt-6" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
