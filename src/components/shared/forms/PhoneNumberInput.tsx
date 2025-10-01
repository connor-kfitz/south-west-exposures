import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode, useRef } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface PhoneNumberInputInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: ReactNode;
  formItemClass: string;
  formLabelClass: string;
  inputClass: string;
}

export default function PhoneNumberInput<T extends FieldValues>({form, name, label, formItemClass, formLabelClass, inputClass}: PhoneNumberInputInputProps<T>) {

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

  function formatPhoneNumber(value: string) {
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

  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = !!form.formState.errors[name];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClass}>
          <FormLabel className={formLabelClass}>{label}</FormLabel>
          <FormControl>
            <Input
              ref={inputRef}
              id={name}
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
              className={`${inputClass} ${hasError
                ? "!border-[#D92525] focus-visible:border-[#D92525] focus-visible:border-2 focus-visible:ring-0"
                : ""
              }`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
