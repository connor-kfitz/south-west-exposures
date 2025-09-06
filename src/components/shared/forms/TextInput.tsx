import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: ReactNode;
  formItemClass: string;
  formLabelClass: string;
  inputClass: string;
}

export default function TextInput<T extends FieldValues>({form, name, label, formItemClass, formLabelClass, inputClass}: TextInputProps<T>) {
  
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
              id={name} {...field}
              className={`${inputClass} ${hasError
                ? "!border-[#D92525] focus-visible:border-[#D92525] focus-visible:border-2 focus-visible:ring-0"
                  : ""
              }`}
            />
          </FormControl>
          <FormMessage className={`${hasError ? "text-[#D92525]" : ""}`}/>
        </FormItem>
      )}
    />
  )
}

