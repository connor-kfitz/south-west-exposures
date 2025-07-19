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
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={formItemClass}>
          <FormLabel className={formLabelClass}>{label}</FormLabel>
          <FormControl>
            <Input {...field} className={inputClass}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

