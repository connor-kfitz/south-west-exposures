import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormValues, volumeFormSchema } from "./NewProductForm";
import { useEffect } from "react";

interface VolumeFormProps {
  mainForm: UseFormReturn<FormValues>;
  formSchema: typeof volumeFormSchema;
  selectedVolume: string;
  formSpacing: string;
  values: z.infer<typeof volumeFormSchema>;
}

export function VolumeForm({ mainForm, formSchema, selectedVolume, formSpacing, values }: VolumeFormProps) {

  const form = useForm<z.infer<typeof volumeFormSchema>>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    form.reset(values);
  }, [form, values])

  const fields = [
    { name: "weight", label: "Weight" },
    { name: "height", label: "Height" },
    { name: "innerDiameter", label: "Inner Diameter" },
    { name: "outerDiameter", label: "Outer Diameter" },
    { name: "shieldingSide", label: "Shielding Side" },
    { name: "shieldingSidePbEquiv", label: "Shielding Side Pb Equiv" },
    { name: "topShield", label: "Top Shield" },
    { name: "topShieldPbEquiv", label: "Top Shield Pb Equiv" },
    { name: "bottom", label: "Bottom" },
    { name: "bottomPbEquiv", label: "Bottom Pb Equiv" },
  ];

  return (
    <div className={`space-y-5 mt-4 ${formSpacing}`}>
      {fields.map(({ name, label }) => (
        <FormField
          key={name}
          control={form.control}
          name={name as keyof z.infer<typeof volumeFormSchema>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormMessage/>
              <Input
                type="number"
                placeholder={label}
                {...field}
                value={field.value || ""}
                onChange={(e) => {
                  const updatedValue = Number(e.target.value);
                  field.onChange(updatedValue);
                  mainForm.setValue(`specifications.${selectedVolume}.${name}` as keyof FormValues, String(updatedValue));
                }}
              />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}
