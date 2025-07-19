import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface TextAreaInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: ReactNode;
  formItemClass: string;
  formLabelClass: string;
  areaClass: string;
  maxChars: number;
}

export default function TextAreaInput<T extends FieldValues>({form, name, label, formItemClass, formLabelClass, areaClass, maxChars}: TextAreaInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const charsLeft = maxChars - (field.value?.length || 0)
        return (
          <FormItem className={formItemClass}>
            <FormLabel className={formLabelClass}>{label}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                maxLength={1000}
                className={areaClass}
              />
            </FormControl>
            <div className="text-b7 leading-b7 text-gray-900">{charsLeft} characters left</div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
